import React, {ReactNode} from "react";
import {connect} from "react-redux";
import {AuthType, StateType} from "../../Redux/redux_store";
import {setAuthUserData, toggleAuthFetching} from '../../Redux/auth_reducer'
import {Preloader} from "../common/Preloader";
import {Header} from "./Header";
import {authAPI} from "../../api/authAPI";
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
       authAPI.auth()
            .then((data)=> {
                if (data.resultCode===0) this.props.setAuthUserData(data.data);
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