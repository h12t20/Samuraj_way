import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {
    AddPostACType,
    InputPostACType,
    SetUserProfileType,
    profile_reducer,
    SetStatusType,
    DeletePostACType, SavePhotoSuccessType, SetProfileEditModeType, SetFormSubmitStatusType
} from "./profile_reducer";
import {AddMessageACType, dialogs_reducer} from "./dialogs_reducer";
import {
    FollowACType,
    SetCurrentPageACType,
    setTotalUsersCountACType,
    toggleFetchingACType,
    SetUserACType,
    users_reducer,
    UserType
} from "./users_reducer";
import {auth_reducer, GetCaptchaURLType, SetUserDataType, ToggleAuthFetchingType} from './auth_reducer'
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {app_reducer, SetGlobalError, SetInitialized} from "./app_reducer";
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({
    profilePage: profile_reducer,
    messagesPage: dialogs_reducer,
    usersPage: users_reducer,
    auth: auth_reducer,
    form: formReducer,
    app: app_reducer
})
export const store = createStore(reducers, composeWithDevTools({trace: true, traceLimit: 25})(applyMiddleware(thunkMiddleware)))

export type ActionType =
    InputPostACType
    | AddPostACType
    | AddMessageACType
    |
    FollowACType
    | SetUserACType
    | SetCurrentPageACType
    | setTotalUsersCountACType
    | toggleFetchingACType
    |
    SetUserProfileType
    | SetUserDataType
    | ToggleAuthFetchingType
    | SetStatusType
    | SetInitialized
    | DeletePostACType
    | SavePhotoSuccessType
| SetProfileEditModeType
|SetFormSubmitStatusType
| GetCaptchaURLType
| SetGlobalError
export type ContactType = {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
}
export type ProfileInfoType = {
    contacts: ContactType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string | null,
        large: string | null
    },
    aboutMe: string
}
export type PostDataType = {
    id: number;
    message: string;
    likesCount: number;
}
export type ProfileType = {
    postsData: PostDataType[],
    profileInfo: ProfileInfoType,
    newPostTitle: string,
    status: string,
    profileEditMode:boolean,
    isFormSubmitSuccess: boolean
};
export type MessageType = {
    dialogsData:
        {
            id: number;
            name: string;
            avatar: string;
        }[];
    messageData: {
        id: number;
        author: string;
        text: string;
    }[],
    newMessageTitle: string;
}
export type UsersType = {
    userData: UserType[],
    pageSize: number,
    totalCount: number,
    currentPage: number,
    isFetching: boolean,
}
export type AuthType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isFetching: boolean,
    captchaURL: string | null
}
export type AppStateType = {
    initialized: boolean,
    globalError: unknown
}
export type StateType = {
    messagesPage: MessageType,
    profilePage: ProfileType,
    usersPage: UsersType,
    auth: AuthType,
    app: AppStateType
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState,
    unknown, AnyAction>

