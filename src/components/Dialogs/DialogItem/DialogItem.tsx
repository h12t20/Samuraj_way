import s from "./DialogsItem.module.css";
import {NavLink} from "react-router-dom";
import React from "react";

export type DialogProps = {
    name: string;
    id: number
}
export const DialogItem = (props: DialogProps) => {
    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={`/dialogs/${props.id}`} className={(isActive)=>
            isActive? s.active: s.dialog}>{props.name}</NavLink>
    </div>
}