import {ChangeEvent} from "react";
import {ActionType, ProfileType} from "./redux_store";

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
        profileInfo: {
            name: 'Sergey Parhomchik',
            avatar: 'https://omoro.ru/wp-content/uploads/2018/05/prikilnie-kartinki-na-avatarky-dlia-devyshek-12.jpg'
        },
        newPostTitle: '',
    }

export const profile_reducer = (state= initialState, action: ActionType) => {
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
        default:
            return state
    }
}
export type InputPostACType = ReturnType<typeof inputPostAC>
export type AddPostACType = ReturnType<typeof addPostAC>
export const inputPostAC = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({
        type: 'INPUT_POST',
        payload: e.currentTarget.value
    } as const)
export const addPostAC = () => ({type: 'ADD_POST'} as const)