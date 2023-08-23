import React, {ReactNode} from "react";
import {ProfileInfoType, StateType} from "../../Redux/redux_store";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile_reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type ProfilePropsType = {
    profileInfo: ProfileInfoType,
    setUserProfile: (profileInfo:ProfileInfoType)=>void,
}

// Your component own properties
type RoutePropsType = RouteComponentProps<{id: string}> & ProfilePropsType

class ProfileContainer extends React.Component<RoutePropsType, { children?: ReactNode }> {
    componentDidMount() {
        let id= !this.props.match.params.id? '2': this.props.match.params.id
        axios
            .get('https://social-network.samuraijs.com/api/1.0/profile/'+id)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }
    render() {
        return (
            <Profile profileInfo={this.props.profileInfo}/>
        )
    }
}
const mapStateToProps = (state: StateType) => ({profileInfo:state.profilePage.profileInfo});
export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));
