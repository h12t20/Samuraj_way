import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {AuthType, StateType} from "../../Redux/redux_store";
import {getAuth} from '../../Redux/auth_reducer'
import {Preloader} from "../common/Preloader";
import {Header} from "./Header";

type UsersPropsType = {
    auth: AuthType,
    getAuth:()=>void
}

class HeaderContainer extends React.Component<UsersPropsType, {
    children?: ReactNode
}> {
    componentDidMount() {
        this.props.getAuth()
    }

    render() {
        return <>
            {this.props.auth.isFetching ? <Preloader/> : null}
            <Header login={this.props.auth.login}/>
        </>
    }
}

const mapStateToProps = (state: StateType) => ({auth: state.auth})
const mapDispatchToProps = {getAuth}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)