import React, {ReactNode} from "react";
import {ProfileInfoType, StateType} from "../../Redux/redux_store";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus} from "../../Redux/profile_reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

export type ProfilePropsType = {
    status: string,
    profileInfo: ProfileInfoType,
    userId: number,
    getProfile: (userID: number) => void,
    getStatus: (userID: number) => void,
    updateStatus: (status:string) => void,
}
type RoutePropsType = RouteComponentProps<{ id: string }> & ProfilePropsType

class ProfileContainer extends React.Component<RoutePropsType, { children?: ReactNode }> {
    componentDidMount() {
        const id = !this.props.match.params.id ? this.props.userId? this.props.userId :
            this.props.history.push('/login'): this.props.match.params.id
        this.props.getProfile(+id)
        this.props.getStatus(+id)
    }
    render() {
        return (
            <Profile profileInfo={this.props.profileInfo} status={this.props.status} updateStatus={this.props.updateStatus}/>
        )
    }
}
const mapStateToProps = (state: StateType) =>
    ({profileInfo: state.profilePage.profileInfo, status:state.profilePage.status, userId:state.auth.id});
export default compose<React.ElementType>(connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter, withAuthRedirect)(ProfileContainer)
