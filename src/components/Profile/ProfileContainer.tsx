import React, {ReactNode} from "react";
import {ProfileInfoType, StateType} from "../../Redux/redux_store";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../Redux/profile_reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
export type ProfilePropsType = {
    profileInfo: ProfileInfoType,
    getProfile:(userID:number)=>void,
}
type RoutePropsType = RouteComponentProps<{id: string}> & ProfilePropsType
class ProfileContainer extends React.Component<RoutePropsType, { children?: ReactNode }> {
    componentDidMount() {
        const id= !this.props.match.params.id? '2': this.props.match.params.id
        this.props.getProfile(+id)
    }
    render() {
        return (
            <Profile profileInfo={this.props.profileInfo}/>
        )
    }
}
const AuthRedirectComponent=withAuthRedirect(ProfileContainer)
const mapStateToProps = (state: StateType) => ({profileInfo:state.profilePage.profileInfo});
export default connect(mapStateToProps, {getProfile})(withRouter(AuthRedirectComponent));
