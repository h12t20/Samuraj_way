import {connect} from "react-redux";
import {UsersAPI} from './UsersAPI';
import {ActionType, StateType} from "../../Redux/redux_store";
import {
    followAC, setCurrentPageAC, setTotalUsersCountAC, setUserAC,
    UserType
} from "../../Redux/users_reducer";

const mapStateToProps = (state: StateType) => {
    return {
        usersPage: state.usersPage
    }
}
const mapDispatchToProps = (dispatch: (action: ActionType)
    => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUserAC(users));
        },
        setCurrentPage:(page:number)=>{
            dispatch(setCurrentPageAC(page))
        },
        setTotalUsersCount: (usersCount: number) => {
            dispatch(setTotalUsersCountAC(usersCount));
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI)