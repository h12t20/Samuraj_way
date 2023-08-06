import React from "react";
import {connect} from "react-redux";
import {Users} from './Users';
import {ActionType, StateType, UsersType} from "../../Redux/redux_store";
import {followAC, setUserAC, UserType} from "../../Redux/users_reducer";

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
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)