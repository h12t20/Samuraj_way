import {ActionType, AuthType, AppDispatch, AppThunk} from "./redux_store";
import {authAPI} from "../api/authAPI";
import {LoginFormType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";
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
               ...action.payload
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

export const setAuthUserData = (payload: AuthType) =>
    ({
        type: 'SET_USER_DATA',
        payload
    } as const)
export const toggleAuthFetching = (isFetching:boolean) => (
        {
            type: 'TOGGLE_AUTH_FETCHING',
            isFetching
        } as const);

export const getAuth = ():AppThunk< Promise<void> >=>{
    return (dispatch:AppDispatch) => {
        toggleAuthFetching(true);
       return authAPI.auth() // return возвращает наружу санки промис
            .then((data)=> {
                const {resultCode} = data;
                if (resultCode===0) dispatch(setAuthUserData(data.data));
            })
            .finally(() => dispatch(toggleAuthFetching(false)))
    }
}
export const login = (loginData: LoginFormType):AppThunk=>{
    return (dispatch:AppDispatch) => {
        toggleAuthFetching(true);
        authAPI.login({...loginData})
            .then((data)=> {
                const {resultCode} = data;
                if (resultCode===0) {
                    dispatch(getAuth()).catch(()=>{throw new Error})
                } else {
                    dispatch(stopSubmit('login', {email:' ',
                        password:data.messages}))
                }
            })
            .finally(() => dispatch(toggleAuthFetching(false)))
    }
}
export const logout = ():AppThunk=>{
    return (dispatch:AppDispatch) => {
        toggleAuthFetching(true);
        authAPI.logout()
            .then((data)=> {
                const {resultCode} = data;
                if (resultCode===0) dispatch(setAuthUserData(initialState));
            })
            .finally(() => dispatch(toggleAuthFetching(false)))
    }
}