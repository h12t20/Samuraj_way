import {ActionType, AppDispatch, AppThunk} from "./redux_store";
import {getAuth} from "./auth_reducer";
const initialState = {initialized:false, globalError: null}
export const app_reducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET_INITIALIZED': {
            return ({
                ...state,
               initialized: true
            })
        }
        case 'APP/SET_GLOBAL_ERROR': {
            return ({
                ...state,
                globalError: action.error
            })
        }
        default:
            return state
    }
}
export type SetInitialized = ReturnType<typeof setInitialized>
export type SetGlobalError = ReturnType<typeof setGlobalError>

export const setInitialized = () =>
    ({
        type: 'APP/SET_INITIALIZED'
    } as const)
export const setGlobalError = (error: unknown) =>
    ({
        type: 'APP/SET_GLOBAL_ERROR',
        error
    } as const)
export const initializeApp = ():AppThunk =>(dispatch:AppDispatch) => {
    dispatch(getAuth())
        .then(()=>{dispatch(setInitialized())})
}
export const globalErrorHandler = (error:unknown ):AppThunk =>(dispatch:AppDispatch) => {
    dispatch(setGlobalError(error))
    console.log(error)
       setTimeout(()=>dispatch(setGlobalError(null)),5000)
}