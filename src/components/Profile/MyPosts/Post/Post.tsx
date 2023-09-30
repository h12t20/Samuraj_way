import React from "react";
import s from './Post.module.css'
import ava from '../../../../assets/images/user.svg'
import like from '../../../../assets/images/like.png'
export type PostPropsType={
    message:string
    likesCount:number
}
export const Post = (props:PostPropsType) => {
    return (
        <div className={s.item}>
            <img className={s.ava} src={ava} alt={'avatar'}/>
            {props.message}
            <img className={s.like} src={like} alt={'like'}/> <span className={s.likesCount}>{props.likesCount}</span>
        </div>
    )
}