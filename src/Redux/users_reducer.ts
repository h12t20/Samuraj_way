import {ChangeEvent} from "react";
import {ActionType, UsersType} from "./redux_store";
export type UserType = {
    id: number,
    photos:
        {
            small: string,
            large: string
        },
    followed: boolean,
    name: string,
    uniqueUrlName:string,
    status: string,
}

export const initialState = {
    userData: []
}

export const users_reducer = (state: UsersType = initialState, action: ActionType) => {
    console.log(action)
    switch (action.type) {
        case 'FOLLOW': {
            return ({
                ...state,
                userData: state.userData.map(user => user.id === action.userID ?
                    {
                        ...user,
                        followed: !user.followed
                    } : user)
            })
        }
        case 'SET_USER': {
            return ({
                ...state,
                userData: [...state.userData, ...action.user]
            })
        }
        default:
            return state
    }
}
export type FollowACType = ReturnType<typeof followAC>
export type SetUserACType = ReturnType<typeof setUserAC>
export const followAC = (id: number) =>
    ({
        type: 'FOLLOW',
        userID: id
    } as const)
export const setUserAC = (user: UserType[]) => (
    {
        type: 'SET_USER',
        user: user
    } as const)