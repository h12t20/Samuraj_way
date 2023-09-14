import {ChangeEvent} from "react";
import {ActionType, AppDispatch, AppThunk, ProfileInfoType} from "./redux_store";
import {profileAPI} from "../api/profileAPI";
import {toggleAuthFetching} from "./auth_reducer";

export const initialState = {
    postsData: [
        {
            id: 1,
            message: 'Hi! How are you?!',
            likesCount: 23
        },
        {
            id: 2,
            message: 'I\'m OK. And you?',
            likesCount: 31
        },
        {
            id: 3,
            message: 'Very good',
            likesCount: 11
        },
        {
            id: 4,
            message: 'Really?!',
            likesCount: 40
        },
    ],
    profileInfo: null,
    status: ''
}

export const profile_reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'PROFILE/INPUT_POST': {
            return ({
                ...state,
                newPostTitle: action.payload
            })
        }
        case 'PROFILE/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPost,
                likesCount: 0
            }
            return ({
                ...state,
                postsData: [...state.postsData, newPost],
            })
        }
        case 'PROFILE/DELETE_POST': {
            return ({
                ...state,
                postsData: state.postsData.filter(el => el.id !== action.id)
            })
        }
        case 'PROFILE/SET_USER_PROFILE': {
            return ({
                ...state,
                profileInfo: action.profileInfo
            })
        }
        case 'PROFILE/SET_STATUS': {
            return ({
                ...state,
                status: action.status
            })
        }
        default:
            return state
    }
}
export type InputPostACType = ReturnType<typeof inputPost>
export type AddPostACType = ReturnType<typeof addPost>
export type DeletePostACType = ReturnType<typeof deletePost>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetStatusType = ReturnType<typeof setStatus>
export const inputPost = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({
        type: 'PROFILE/INPUT_POST',
        payload: e.currentTarget.value
    } as const)
export const addPost = (newPost: string) => ({
    type: 'PROFILE/ADD_POST',
    newPost
} as const);
export const deletePost = (id: number) => ({
    type: 'PROFILE/DELETE_POST',
    id
} as const);
export const setUserProfile = (profileInfo: ProfileInfoType) => ({
    type: 'PROFILE/SET_USER_PROFILE',
    profileInfo
} as const)
export const setStatus = (status: string) => ({
    type: 'PROFILE/SET_STATUS',
    status
} as const)
export const getProfile = (userId: number): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        const res = await profileAPI.getProfile(userId)
        {
            dispatch(setUserProfile(res))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}

export const getStatus = (userId: number): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}
export const updateStatus = (status: string): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        const res: { resultCode: number } = await profileAPI.updateStatus(status)
        if (res.resultCode === 0) dispatch(setStatus(status))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}