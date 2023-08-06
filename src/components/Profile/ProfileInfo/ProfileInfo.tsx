import React from "react";
import s from './ProfileInfo.module.css'

type ProfileInfoProps = {
    profileInfo: {
        name: string,
        avatar: string
    }
}

export const ProfileInfo = (props: ProfileInfoProps) => {
    return (
        <div>
            <div>
                <img className={s.photo}
                     src='https://static.tildacdn.com/tild3661-6435-4033-b866-663064366265/panorama-gorod-mosty.jpg'
                     alt='фото'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.ava} src={props.profileInfo.avatar}/>  <div>{props.profileInfo.name}</div>
            </div>
        </div>
    )
}
