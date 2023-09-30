import s from "./DialogsItem.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import ava from '../../../assets/images/user.svg'

export type DialogProps = {
    name: string;
    id: number
}
export const DialogItem = (props: DialogProps) => {
    return <div className={s.dialog + ' ' + s.active}>
        <img src={ava} alt={'avatar'}/>
        <NavLink to={`/dialogs/${props.id}`} className={(isActive)=>
            isActive? s.active: s.dialog}>{props.name}</NavLink>
    </div>
}