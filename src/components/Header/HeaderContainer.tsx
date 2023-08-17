import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {AuthType, StateType} from "../../Redux/redux_store";
import {toggleAuthFetching, setAuthUserData} from '../../Redux/auth_reducer'
import axios from "axios";
import {Preloader} from "../common/Preloader";
import {Header} from "./Header";
type UsersPropsType = {
    setAuthUserData: (data: AuthType) => void,
    toggleAuthFetching: (isFetching: boolean) => void,
    auth: AuthType
}

class HeaderContainer extends React.Component<UsersPropsType, {
    children?: ReactNode
}> {
    componentDidMount() {
        this.props.toggleAuthFetching(true);
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response)=> {
                if (response.data.resultCode===0) this.props.setAuthUserData(response.data.data);
            })
            .finally(() => this.props.toggleAuthFetching(false))
    }

    render() {
        return <>
            {this.props.auth.isFetching ? <Preloader/> : null}
            <Header login={this.props.auth.login}/>
        </>
    }
}

const mapStateToProps = (state: StateType) => ({auth: state.auth})
const mapDispatchToProps = {setAuthUserData, toggleAuthFetching}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)