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
    userData: [],
    pageSize:10,
    totalCount:1,
    currentPage:1
}

export const users_reducer = (state: UsersType = initialState, action: ActionType) => {
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
                userData: [...action.user]
            })
        }
        case 'SET_CURRENT_PAGE': {
            return ({
                ...state,
                currentPage:action.currentPage
            })
        }
        case 'SET_TOTAL_USERS': {
            return ({
                ...state,
                totalCount:action.totalUsers
            })
        }
        default:
            return state
    }
}
export type FollowACType = ReturnType<typeof followAC>
export type SetUserACType = ReturnType<typeof setUserAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>

export const followAC = (id: number) =>
    ({
        type: 'FOLLOW',
        userID: id
    } as const);
export const setUserAC = (user: UserType[]) => (
    {
        type: 'SET_USER',
        user
    } as const);
export const setCurrentPageAC = (currentPage: number) => (
    {
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const);
export const setTotalUsersCountAC = (totalUsers: number) => (
    {
        type: 'SET_TOTAL_USERS',
        totalUsers
    } as const);
