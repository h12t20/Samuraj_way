import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
export const Header=(props: {login:string | null})=> {
    return (<header className={s.header}>
            <img src='https://cdn.logo.com/hotlink-ok/logo-social.png' alt='logo'/>
        <div className={s.loginBlock}>{!!props.login? props.login:<NavLink to={'/login'}>Login</NavLink>}</div>
        </header>)
}
