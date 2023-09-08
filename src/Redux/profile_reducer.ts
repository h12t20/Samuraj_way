import {ChangeEvent} from "react";
import {ActionType, AppDispatch, AppThunk, ProfileInfoType} from "./redux_store";
import {profileAPI} from "../api/profileAPI";

const initialState = {
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
        case 'INPUT_POST': {
            return ({
                ...state,
                newPostTitle: action.payload
            })
        }
        case 'ADD_POST': {
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
        case 'SET_USER_PROFILE': {
            return ({
                ...state,
                profileInfo: action.profileInfo
            })
        }
        case 'SET_STATUS': {
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
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetStatusType = ReturnType<typeof setStatus>
export const inputPost = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({
        type: 'INPUT_POST',
        payload: e.currentTarget.value
    } as const)
export const addPost = (newPost:string) => ({type: 'ADD_POST', newPost} as const);
export const setUserProfile = (profileInfo: ProfileInfoType) => ({
    type: 'SET_USER_PROFILE',
    profileInfo
} as const)
export const setStatus = (status: string) => ({
    type: 'SET_STATUS',
    status
} as const)
export const getProfile = (userId:number):AppThunk => {
    return (dispatch: AppDispatch) => {
        profileAPI.getProfile(userId)
            .then(res => {dispatch(setUserProfile(res))})
    }
}
export const getStatus = (userId:number):AppThunk => {
    return (dispatch: AppDispatch) => {
        profileAPI.getStatus(userId)
            .then(res => {
                dispatch(setStatus(res))})
    }
}
export const updateStatus = (status:string):AppThunk => {
    return (dispatch: AppDispatch) => {
        profileAPI.updateStatus(status)
            .then(res => {
                if (res.resultCode===0) dispatch(setStatus(status))})
    }
}