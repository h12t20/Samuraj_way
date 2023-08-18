import {ActionType, AuthType} from "./redux_store";
const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching:false
}
export const auth_reducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return ({
                ...state,
               ...action.data
            })
        }
        case 'TOGGLE_AUTH_FETCHING': {
            return ({
                ...state,
                isFetching: action.isFetching
            })
        }
        default:
            return state
    }
}
export type SetUserDataType = ReturnType<typeof setAuthUserData>
export type ToggleAuthFetchingType = ReturnType<typeof toggleAuthFetching>

export const setAuthUserData = (data: AuthType) =>
    ({
        type: 'SET_USER_DATA',
        data
    } as const)
export const toggleAuthFetching = (isFetching:boolean) => (
        {
            type: 'TOGGLE_AUTH_FETCHING',
            isFetching
        } as const);