import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {StateType, UsersType} from "../../Redux/redux_store";
import {followUsers, getUsers} from "../../Redux/users_reducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type UsersPropsType = {
    usersPage: UsersType;
    getUsers:(currentPage:number, pageSize:number)=>void;
    followUsers:(isFollow: boolean, userID: number, setFollowingProgress: React.Dispatch<React.SetStateAction<boolean>>)=>void
}

class UsersContainer extends React.Component<UsersPropsType, {children?: ReactNode}> {
    componentDidMount() {this.props.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)}
    onPageChanged = (page: number) => {this.props.getUsers(page, this.props.usersPage.pageSize)}
    render() {
        return <>
            {this.props.usersPage.isFetching? <Preloader/>:null}
        <Users usersPage={this.props.usersPage} onPageChanged={this.onPageChanged}
               followUsers={this.props.followUsers}/>
        </>
    }
}

const mapStateToProps = (state: StateType) => ({usersPage: state.usersPage})
const mapDispatchToProps = {getUsers, followUsers}
export default withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(UsersContainer))