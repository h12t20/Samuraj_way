import {combineReducers, createStore} from "redux";
import {AddPostACType, InputPostACType, profile_reducer} from "./profile_reducer";
import {AddMessageACType, dialogs_reducer, InputMessageACType} from "./dialogs_reducer";
import {FollowACType, SetUserACType, users_reducer, UserType} from "./users_reducer";

let reducers = combineReducers({
    profilePage: profile_reducer,
    messagesPage: dialogs_reducer,
    usersPage: users_reducer
})
export let store = createStore(reducers)

export type ActionType = InputPostACType | AddPostACType | InputMessageACType | AddMessageACType |
    FollowACType | SetUserACType;
export type ProfileType = {
    postsData: {
        id: number;
        message: string;
        likesCount: number;
    }[],
    profileInfo: {
        name: string;
        avatar: string
    },
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
    userData: UserType[]
}
export type StateType = {
    messagesPage: MessageType,
    profilePage: ProfileType,
    usersPage: UsersType
}
