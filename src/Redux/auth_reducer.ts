import {ActionType, AuthType} from "./redux_store";

const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false
}
export const auth_reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return ({
                ...state,
                ...action.data
            })
        }
        default:
            return state
    }
}
export type SetUserDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (data: AuthType) =>
    ({
        type: 'SET_USER_DATA',
        data
    } as const)
export const toggleAuthFetching = (isFetching: boolean) => (
    {
        type: 'TOGGLE_AUTH_FETCHING',
        isFetching
    } as const);