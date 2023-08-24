import {ChangeEvent} from "react";
import {ActionType, ProfileInfoType} from "./redux_store";
import {Dispatch} from "redux";
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
    newPostTitle: ''
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
                message: state.newPostTitle,
                likesCount: 0
            }
            return ({
                ...state,
                postsData: [...state.postsData, newPost],
                newPostTitle: ''
            })
        }
        case 'SET_USER_PROFILE': {
            return ({
                ...state,
                profileInfo: action.profileInfo
            })
        }
        default:
            return state
    }
}
export type InputPostACType = ReturnType<typeof inputPost>
export type AddPostACType = ReturnType<typeof addPost>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export const inputPost = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({
        type: 'INPUT_POST',
        payload: e.currentTarget.value
    } as const)
export const addPost = () => ({type: 'ADD_POST'} as const);
export const setUserProfile = (profileInfo: ProfileInfoType) => ({
    type: 'SET_USER_PROFILE',
    profileInfo
} as const)
export const getProfile = (userId:number) => {
    return (dispatch: Dispatch) => {
        profileAPI.getProfile(userId)
            .then(res => {dispatch(setUserProfile(res))})
    }
}