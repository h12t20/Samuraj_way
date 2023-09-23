import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import user from '../../../assets/images/user.svg'
import {ProfileInfoType} from "../../../Redux/redux_store";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
type ProfileInfoProType = {
    profileInfo: ProfileInfoType,
    status: string,
    updateStatus: (status: string) => void
}
export const ProfileInfo = (props: ProfileInfoProType) => {
    if (!props.profileInfo) return <Preloader/>
   return (
        <div>
            <div>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.ava} src={props.profileInfo.photos.large ? props.profileInfo.photos.large :
                    props.profileInfo.photos.small ? props.profileInfo.photos.small: user}
                     alt='photo'/>
                <div>{props.profileInfo.fullName}</div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>

            </div>
        </div>
    )
}
