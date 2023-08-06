import {ChangeEvent} from "react";
import {ActionType} from "./redux_store";

const initialState = {
    dialogsData: [
        {
            id: 1,
            name: 'Sasha',
            avatar: ''
        },
        {
            id: 2,
            name: 'Masha',
            avatar: ''
        },
        {
            id: 3,
            name: 'Petya',
            avatar: ''
        },
        {
            id: 4,
            name: 'Stepan',
            avatar: ''
        },
    ],
    messageData: [
        {
            id: 1,
            author: 'me',
            text: 'Hello! How are you?'
        },
        {
            id: 2,
            author: 'you',
            text: 'Im fine, thanks'
        },
        {
            id: 3,
            author: 'me',
            text: 'How do you do?'
        },
        {
            id: 4,
            author: 'you',
            text: 'Glad to see you'
        },
        {
            id: 5,
            author: 'me',
            text: 'Yo!'
        },
    ],
    newMessageTitle: ''
}
export const dialogs_reducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'INPUT_MESSAGE': {
            return ({
                ...state,
                newMessageTitle: action.payload
            })
        }
        case 'ADD_MESSAGE': {
            let newMessage = {
                id: 6,
                author: 'me',
                text: state.newMessageTitle
            }
            return ({
                ...state,
                messageData: [...state.messageData, newMessage],
                newMessageTitle: ''
            })
        }
        default:
            return state
    }
}
export type InputMessageACType = ReturnType<typeof inputMessageAC>
export type AddMessageACType = ReturnType<typeof addMessageAC>
export const inputMessageAC = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({
        type: 'INPUT_MESSAGE',
        payload: e.currentTarget.value
    } as const)
export const addMessageAC = () => ({type: 'ADD_MESSAGE'} as const)