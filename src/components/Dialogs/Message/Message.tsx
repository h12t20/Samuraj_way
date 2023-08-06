import s from "./Message.module.css";
import React from "react";

export const Message = (props: {
    author: string,
    text: string
}) => {
    return <div className={props.author==='me'? s.me: s.you}><b>{props.author}:</b> {props.text}</div>
}