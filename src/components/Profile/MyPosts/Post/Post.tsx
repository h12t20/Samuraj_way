import React from "react";
import s from './Post.module.css'
import ava from '../../../../assets/images/user.svg'
export type PostPropsType={
    message:string
    likesCount:number
}
export const Post = (props:PostPropsType) => {
    return (
        <div className={s.item}>
            <img src={ava}/>
            {props.message}
            <div>like</div> {props.likesCount}
        </div>
    )
}