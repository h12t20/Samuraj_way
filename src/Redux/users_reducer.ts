import {ActionType, AppDispatch, AppThunk, UsersType} from "./redux_store";
import {usersAPI} from "../api/usersAPI";
import React from "react";
import {followAPI} from "../api/followAPI";

export type UserType = {
    id: number,
    photos:
        {
            small: string,
            large: string
        },
    followed: boolean,
    name: string,
    uniqueUrlName: string,
    status: string,
}

export const initialState = {
    userData: [],
    pageSize: 10,
    totalCount: 1,
    currentPage: 1,
    isFetching: false
}

export const users_reducer = (state: UsersType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'USERS/FOLLOW': {
            return ({
                ...state,
                userData: state.userData.map(user => user.id === action.userID ?
                    {
                        ...user,
                        followed: !user.followed
                    } : user)
            })
        }
        case 'USERS/SET_USER': {
            return ({
                ...state,
                userData: [...action.user]
            })
        }
        case 'USERS/SET_CURRENT_PAGE': {
            return ({
                ...state,
                currentPage: action.currentPage
            })
        }
        case 'USERS/SET_TOTAL_USERS': {
            return ({
                ...state,
                totalCount: action.totalUsers
            })
        }
        case 'USERS/TOGGLE_FETCHING': {
            return ({
                ...state,
                isFetching: action.isFetching
            })
        }
        default:
            return state
    }
}
export type FollowACType = ReturnType<typeof follow>
export type SetUserACType = ReturnType<typeof setUser>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type toggleFetchingACType = ReturnType<typeof toggleFetching>

export const follow = (userID: number) =>
    ({
        type: 'USERS/FOLLOW',
        userID
    } as const);
export const setUser = (user: UserType[]) => (
    {
        type: 'USERS/SET_USER',
        user
    } as const);
export const setCurrentPage = (currentPage: number) => (
    {
        type: 'USERS/SET_CURRENT_PAGE',
        currentPage
    } as const);
export const setTotalUsersCount = (totalUsers: number) => (
    {
        type: 'USERS/SET_TOTAL_USERS',
        totalUsers
    } as const);
export const toggleFetching = (isFetching: boolean) => (
    {
        type: 'USERS/TOGGLE_FETCHING',
        isFetching
    } as const);
export const getUsers = (currentPage: number, pageSize: number): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUser(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleFetching(false))
    }
}

export const followUsers = (isFollow: boolean, userID: number, setDisableButton:
    React.Dispatch<React.SetStateAction<boolean>>): AppThunk => async (dispatch: AppDispatch) => {
    try {
        setDisableButton(true);
        dispatch(toggleFetching(true));
        const res:{resultCode:number} = isFollow ? await followAPI.follow(userID) : await followAPI.unfollow(userID);
        if (res.resultCode === 0) {
            setDisableButton(false);
            dispatch(follow(userID))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleFetching(false))
    }
}