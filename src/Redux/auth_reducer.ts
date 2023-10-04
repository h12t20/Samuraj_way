import {ActionType, AppDispatch, AppThunk} from "./redux_store";
import {authAPI} from "../api/authAPI";
import {LoginFormType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";
import {globalErrorHandler} from "./app_reducer";

const initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    captchaURL: null
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
        case 'AUTH/GET_CAPTCHA_URL': {
            return ({
                ...state,
                captchaURL: action.captcha
            })
        }
        default:
            return state
    }
}
export type SetUserDataType = ReturnType<typeof setAuthUserData>
export type ToggleAuthFetchingType = ReturnType<typeof toggleAuthFetching>
export type GetCaptchaURLType = ReturnType<typeof getCaptchaURL>

export const setAuthUserData = (payload: {
    captchaURL: null;
    isFetching: boolean;
    id: null;
    login: null;
    email: null
}) =>
    ({
        type: 'AUTH/SET_USER_DATA',
        payload
    } as const)
export const toggleAuthFetching = (isFetching: boolean) => (
    {
        type: 'AUTH/TOGGLE_AUTH_FETCHING',
        isFetching
    } as const);
export const getCaptchaURL = (captcha: string | null) => (
    {
        type: 'AUTH/GET_CAPTCHA_URL',
        captcha
    } as const);

export const getAuth = (): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        let data = await authAPI.auth();
        const {resultCode} = data;
        if (resultCode === 0) dispatch(setAuthUserData(data.data))
        else new Error('Some error');
    } catch (error) {
        dispatch(globalErrorHandler(error))
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}

export const getCaptcha = (): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
    try {
        dispatch(toggleAuthFetching(true));
        let data = await authAPI.captcha();
        const {url} = data;
       dispatch(getCaptchaURL(url))
    } catch (error) {
        dispatch(globalErrorHandler(error))
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
                dispatch(getCaptchaURL(null))
            })
        } else if (resultCode === 10) {
            await dispatch(getCaptcha())
        }
            dispatch(stopSubmit('login', {
                email: ' ',
                password: data.messages
            }))
    } catch (error) {
        dispatch(globalErrorHandler(error))
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
        dispatch(globalErrorHandler(error))
    } finally {
        dispatch(toggleAuthFetching(false))
    }
}