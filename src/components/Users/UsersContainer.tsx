import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {ActionType, StateType, UsersType} from "../../Redux/redux_store";
import {followAC, setCurrentPageAC, setTotalUsersCountAC, setUserAC, UserType
} from "../../Redux/users_reducer";
import axios from "axios";
import {Users} from "./Users";
type UsersPropsType = {
    usersPage: UsersType;
    follow: (userId: number) => void;
    setUsers: (users: UserType[]) => void,
    setCurrentPage: (page: number) => void,
    setTotalUsersCount: (totalUsers: number) => void
}

export class UsersAPI extends React.Component<UsersPropsType, {children?: ReactNode}> {
    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0//users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0//users?page=${page}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users usersPage={this.props.usersPage} follow={this.props.follow} onPageChanged={this.onPageChanged}/>
    }
}


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