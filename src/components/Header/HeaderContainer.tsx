import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {AuthType, StateType} from "../../Redux/redux_store";
import {logout} from '../../Redux/auth_reducer'
import {Preloader} from "../common/Preloader";
import {Header} from "./Header";

type UsersPropsType = {
    auth: AuthType,
    logout:()=>void
}
class HeaderContainer extends React.Component<UsersPropsType, {
    children?: ReactNode
}> {
    render() {
        return <>
            {this.props.auth.isFetching ? <Preloader/> : null}
            <Header login={this.props.auth.login} logout={this.props.logout}/>
        </>
    }
}
const mapStateToProps = (state: StateType) => ({auth: state.auth})
export default connect(mapStateToProps, {logout})(HeaderContainer)