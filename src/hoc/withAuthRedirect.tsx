import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {StateType} from "../Redux/redux_store";
import {connect} from "react-redux";
type mapSTPType = {isAuth:boolean}

const mapSTP=(state:StateType):mapSTPType=>({isAuth: !!state.auth.login})
export function withAuthRedirect<P>(Component:ComponentType<P>) {
    function RedirectComponent(props:mapSTPType) {
        const {isAuth, ...restProps}= props
        if (!props.isAuth) return <Redirect to='/login'/>
        return <Component {...restProps as P}/>
    }
    return connect(mapSTP)(RedirectComponent)
}

