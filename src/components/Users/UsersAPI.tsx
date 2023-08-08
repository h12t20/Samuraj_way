import React, {ReactNode} from "react";
import {UsersType} from "../../Redux/redux_store";
import axios from "axios";
import {UserType} from "../../Redux/users_reducer";

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
