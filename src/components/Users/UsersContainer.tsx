import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {StateType, UsersType} from "../../Redux/redux_store";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUser,
    toggleFetching,
    UserType
} from "../../Redux/users_reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";
import {usersAPI} from "../../api/usersAPI";

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
        usersAPI.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
            .then(data => {
                this.props.setUser(data.items);
                this.props.setTotalUsersCount(data.totalCount)
            })
            .finally(()=>this.props.toggleFetching(false))
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page);
        this.props.toggleFetching(true);
       usersAPI.getUsers(page, this.props.usersPage.pageSize)
            .then(data => {this.props.setUser(data.items)})
            .finally(()=>this.props.toggleFetching(false))
    }

    render() {
        return <>
            {this.props.usersPage.isFetching? <Preloader/>:null}
        <Users usersPage={this.props.usersPage} follow={this.props.follow}
               onPageChanged={this.onPageChanged}/>
        </>
    }
}

const mapStateToProps = (state: StateType) => ({usersPage: state.usersPage})
const mapDispatchToProps = {follow, setUser, setCurrentPage, setTotalUsersCount, toggleFetching}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)