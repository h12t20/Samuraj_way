import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import user from '../../../assets/images/user.svg'
import {ProfileInfoType} from "../../../Redux/redux_store";
export const ProfileInfo = (props: {profileInfo: ProfileInfoType}) => {
    if (!props.profileInfo) return <Preloader/>
   return (
        <div>
            <div>
                <img className={s.photo}
                     src='https://static.tildacdn.com/tild3661-6435-4033-b866-663064366265/panorama-gorod-mosty.jpg'
                     alt='photo'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.ava} src={props.profileInfo.photos.large ? props.profileInfo.photos.large :
                    props.profileInfo.photos.small ? props.profileInfo.photos.small: user}
                     alt='photo'/>
                <div>{props.profileInfo.fullName}</div>
            </div>
        </div>
    )
}
