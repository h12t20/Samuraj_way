import s from "./Message.module.css";
import React from "react";
import ava from '../../../assets/images/user.svg'

export const Message = (props: {
    author: string,
    text: string
}) => {
    return props.author === 'me' ? <div className={s.me}><b>
        <div className={s.author}><img src={ava} alt={'avatar'}/>{props.author}</div>
    </b>
        <div className={s.text}>{props.text}</div>
    </div> : <div className={s.you}>
        <div className={s.text}>{props.text}</div>
        <b>
            <div className={s.author}><img src={ava} alt={'avatar'}/>{props.author}</div>
        </b></div>
}