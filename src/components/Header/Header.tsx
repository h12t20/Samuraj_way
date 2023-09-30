import React from "react";
import s from './Header.module.css'
import {useHistory} from "react-router-dom";
import logo from '../../assets/images/social-network.svg'
import user from '../../assets/images/user.svg'
import {ProfileInfoType} from "../../Redux/redux_store";
import {CollapsedMenu, collapsedMenuType} from "../common/CollapsedMenu";
import arrow from '../../assets/images/arrow_down.png'

export const Header = (props: {
    login: string | null,
    logout: () => void,
    profileInfo: ProfileInfoType
}) => {
    const logOutHandler = () => {
        props.logout()
    }
    const history = useHistory();
    const loginMenu: collapsedMenuType = [
        {
            id: 1,
            value: 'Profile',
            action: () => history.push('/profile')
        },
        {
            id: 2,
            value: 'Setting',
            action: () => history.push('/setting')
        },
        {
            id: 3,
            value: 'Logout',
            action: logOutHandler
        }
    ]
    return (<header className={s.header}>
        <div className={s.logo}><i> The Social Network </i><img src={logo} alt='logo'/></div>
        <div className={s.loginBlock}>{props.login ?
            <div className={s.logout}>
                <img className={s.ava} src={user} alt={'photo'}/>
                <div className={s.login}><CollapsedMenu label={<div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <div style={{marginBottom: 2, color:  'rgb(33, 33, 33)'}}>{props.login}</div>
                    <img style={{
                        height: 20,
                        width: 20
                    }} src={arrow} alt={'arrow'}/></div>} menu={loginMenu}/></div>
            </div> :
            <div className={s.loginLabel} onClick={()=>history.push('/login')}>Login</div>}</div>
    </header>)
}
