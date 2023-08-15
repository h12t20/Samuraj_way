import {combineReducers, createStore} from "redux";
import {AddPostACType, InputPostACType, SetUserProfileType, profile_reducer} from "./profile_reducer";
import {AddMessageACType, dialogs_reducer, InputMessageACType} from "./dialogs_reducer";
import {
    FollowACType,
    SetCurrentPageACType,
    setTotalUsersCountACType,
    toggleFetchingACType,
    SetUserACType,
    users_reducer,
    UserType
} from "./users_reducer";

let reducers = combineReducers({
    profilePage: profile_reducer,
    messagesPage: dialogs_reducer,
    usersPage: users_reducer
})
export let store = createStore(reducers);

export type ActionType = InputPostACType | AddPostACType | InputMessageACType | AddMessageACType |
    FollowACType | SetUserACType | SetCurrentPageACType | setTotalUsersCountACType | toggleFetchingACType | SetUserProfileType
export type ProfileInfoType = {
    aboutMe: string,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string | null,
        large: string | null
    }
}
export type PostDataType = {
        id: number;
        message: string;
        likesCount: number;
}
export type ProfileType = {
    postsData: PostDataType[],
    profileInfo: ProfileInfoType,
    newPostTitle: string
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
    pageSize:number,
    totalCount:number,
    currentPage:number,
    isFetching:boolean
}
export type StateType = {
    messagesPage: MessageType,
    profilePage: ProfileType,
    usersPage: UsersType,
}
