import React from "react";
import s from './Post.module.css'
export type PostPropsType={
    message:string
    likesCount:number
}
export const Post = (props:PostPropsType) => {
    return (
        <div className={s.item}>
            <img src="https://omoro.ru/wp-content/uploads/2018/05/prikilnie-kartinki-na-avatarky-dlia-devyshek-12.jpg" alt='ава'/>
            {props.message}
            <div>like</div> {props.likesCount}
        </div>
    )
}