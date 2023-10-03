import React, {ReactNode} from "react";
import {ProfileInfoType, StateType} from "../../Redux/redux_store";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, setProfileEditMode, updateStatus} from "../../Redux/profile_reducer";
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
    savePhoto: (file: File)=>void,
    profileEditMode: boolean,
    setProfileEditMode: (mode:boolean)=>void,
    isFormSubmitSuccess: boolean
}
type RoutePropsType = RouteComponentProps<{ id: string }> & ProfilePropsType

class ProfileContainer extends React.Component<RoutePropsType, { children?: ReactNode }> {
    refreshProfile() {
        const id = !this.props.match.params.id ? this.props.userId? this.props.userId :
            this.props.history.push('/login'): this.props.match.params.id
        this.props.getProfile(+id)
        this.props.getStatus(+id)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<RoutePropsType>, prevState: Readonly<{
        children?: React.ReactNode
    }>, snapshot?: any) {
        if (this.props.match.params.id !== prevProps.match.params.id) this.refreshProfile()
    }

    render() {
        return (
            <Profile isOwner={!this.props.match.params.id} profileInfo={this.props.profileInfo}
                     status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto}
                     setProfileEditMode={this.props.setProfileEditMode} profileEditMode={this.props.profileEditMode}
            isFormSubmitSuccess = {this.props.isFormSubmitSuccess}/>
        )
    }
}
const mapStateToProps = (state: StateType) =>
    ({profileInfo: state.profilePage.profileInfo, status:state.profilePage.status, userId:state.auth.id,
        profileEditMode: state.profilePage.profileEditMode, isFormSubmitSuccess: state.profilePage.isFormSubmitSuccess});
export default compose<React.ElementType>(connect(mapStateToProps,
        {getProfile, getStatus, updateStatus, savePhoto, setProfileEditMode}),
    withRouter, withAuthRedirect)(ProfileContainer)
