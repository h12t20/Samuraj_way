import {ActionType, AuthType} from "./redux_store";
import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
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

export const getAuth = ()=>{
    return (dispatch:Dispatch) => {
        toggleAuthFetching(true);
        authAPI.auth()
            .then((data)=> {
                const {resultCode} = data;
                if (resultCode===0) dispatch(setAuthUserData(data.data));
            })
            .finally(() => dispatch(toggleAuthFetching(false)))
    }
}