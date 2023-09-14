import {ActionType, AppDispatch, AppThunk} from "./redux_store";
import {getAuth} from "./auth_reducer";
const initialState = {initialized:false}
export const app_reducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return ({
                ...state,
               initialized: true
            })
        }
        default:
            return state
    }
}
export type SetInitialized = ReturnType<typeof setInitialized>

export const setInitialized = () =>
    ({
        type: 'SET_INITIALIZED'
    } as const)
export const initializeApp = ():AppThunk =>(dispatch:AppDispatch) => {
    dispatch(getAuth())
        .then(()=>{dispatch(setInitialized())})
}