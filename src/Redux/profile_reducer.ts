import {ChangeEvent} from "react";
import {ActionType, AppDispatch, AppThunk, ProfileInfoType, RootState} from "./redux_store";
import {profileAPI} from "../api/profileAPI";
import {toggleAuthFetching} from "./auth_reducer";
import {stopSubmit} from "redux-form";
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
        {
            id: 5,
            message: 'Yo!!!',
            likesCount: 20
        },
    ],
    profileInfo: null,
    status: '',
    profileEditMode: false,
    isFormSubmitSuccess: false
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
        case 'PROFILE/SET_PHOTO': {
            const profile = state.profileInfo? state.profileInfo: {}
            return {
                ...state,
                profileInfo: {...profile, photos: action.photos}
            }

        }
        case 'PROFILE/SET_EDIT_MODE': {
            return {
               ...state, profileEditMode:action.mode
            }
        }
        case 'PROFILE/SET_FORM_SUBMIT_SUCCESS': {
            return {
                ...state, isFormSubmitSuccess:action.status
            }
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
export type SavePhotoSuccessType = ReturnType<typeof savePhotoSuccess>
export type SetProfileEditModeType = ReturnType<typeof setProfileEditMode>
export type SetFormSubmitStatusType = ReturnType<typeof setFormSubmitStatus>
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
export const savePhotoSuccess = (photos: {large: string | null, small:string | null}) => ({
    type: 'PROFILE/SET_PHOTO',
    photos
} as const)
export const setProfileEditMode = (mode: boolean) => ({
    type: 'PROFILE/SET_EDIT_MODE',
    mode
} as const)
export const setFormSubmitStatus = (status: boolean) => ({
    type: 'PROFILE/SET_FORM_SUBMIT_SUCCESS',
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
export const updateProfile = (formData: ProfileInfoType):AppThunk=> async (dispatch: AppDispatch, getState:()=>RootState) => {
try {
        dispatch(toggleAuthFetching(true));
        const res: { resultCode: number, messages: string[] } = await profileAPI.updateProfile(formData)
        if (res.resultCode === 0) {
            dispatch(setFormSubmitStatus(true))
            // @ts-ignore
            dispatch(getProfile(getState().auth.id))
        } else {
            dispatch(setFormSubmitStatus(false))
            dispatch(stopSubmit('profile',
                res.messages[0].toLowerCase().includes('name')? {fullName: res.messages}:
                        res.messages[0].toLowerCase().includes('job')? {lookingForAJobDescription: res.messages}:
                            res.messages[0].toLowerCase().includes('facebook')? {'contacts': {'facebook': res.messages}}:
                                res.messages[0].toLowerCase().includes('vk')? {'contacts': {'vk': res.messages}}:
                                    res.messages[0].toLowerCase().includes('website')? {'contacts': {'website': res.messages}}:
                                    res.messages[0].toLowerCase().includes('twitter')? {'contacts': {'twitter': res.messages}}:
                                        res.messages[0].toLowerCase().includes('instagram')? {'contacts': {'instagram': res.messages}}:
                                            res.messages[0].toLowerCase().includes('youtube')? {'contacts': {'youtube': res.messages}}:
                                                res.messages[0].toLowerCase().includes('github')? {'contacts': {'github': res.messages}}:undefined))}

   } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}
export const savePhoto = (file: File): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        const res: { resultCode: number, data: {photos:{large: string | null, small:string | null}} } = await profileAPI.savePhoto(file)
        console.log(res)
        if (res.resultCode === 0) dispatch(savePhotoSuccess(res.data.photos))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}