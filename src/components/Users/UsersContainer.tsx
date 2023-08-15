import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {StateType, UsersType} from "../../Redux/redux_store";
import {follow, setCurrentPage, setTotalUsersCount, setUser, toggleFetching, UserType} from "../../Redux/users_reducer";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";

type UsersPropsType = {
    usersPage: UsersType;
    follow: (userId: number) => void;
    setUser: (users: UserType[]) => void,
    setCurrentPage: (page: number) => void,
    setTotalUsersCount: (totalUsers: number) => void,
    toggleFetching:(isFetching:boolean)=>void
}

class UsersContainer extends React.Component<UsersPropsType, {children?: ReactNode}> {
    componentDidMount() {
        this.props.toggleFetching(true);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUser(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
            .finally(()=>this.props.toggleFetching(false))
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page);
        this.props.toggleFetching(true);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.usersPage.pageSize}`)
            .then(response => {this.props.setUser(response.data.items)})
            .finally(()=>this.props.toggleFetching(false))
    }

    render() {
        return <>
            {this.props.usersPage.isFetching? <Preloader/>:null}
        <Users usersPage={this.props.usersPage} follow={this.props.follow} onPageChanged={this.onPageChanged}/>
        </>
    }
}

const mapStateToProps = (state: StateType) => ({usersPage: state.usersPage})
const mapDispatchToProps = {follow, setUser, setCurrentPage, setTotalUsersCount, toggleFetching}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)