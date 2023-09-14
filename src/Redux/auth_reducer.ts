import {ActionType, AuthType, AppDispatch, AppThunk} from "./redux_store";
import {authAPI} from "../api/authAPI";
import {LoginFormType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";

const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false
}
export const auth_reducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA': {
            return ({
                ...state,
                ...action.payload
            })
        }
        case 'AUTH/TOGGLE_AUTH_FETCHING': {
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
        type: 'AUTH/SET_USER_DATA',
        payload
    } as const)
export const toggleAuthFetching = (isFetching: boolean) => (
    {
        type: 'AUTH/TOGGLE_AUTH_FETCHING',
        isFetching
    } as const);

export const getAuth = (): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        let data = await authAPI.auth();
        const {resultCode} = data;
        if (resultCode === 0) dispatch(setAuthUserData(data.data))
        else new Error('Some error');
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}

export const login = (loginData: LoginFormType): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        const data = await authAPI.login({...loginData});
        const {resultCode} = data;
        if (resultCode === 0) {
            dispatch(getAuth()).catch((error) => {
                console.log(error)
            })
        } else {
            dispatch(stopSubmit('login', {
                email: ' ',
                password: data.messages
            }))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        let data = await authAPI.logout()
        const {resultCode} = data;
        if (resultCode === 0) dispatch(setAuthUserData(initialState));
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}