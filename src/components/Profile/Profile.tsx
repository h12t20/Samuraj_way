import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../Redux/redux_store";
import s from './Profile.module.css'

type ProfileType = {
    profileInfo: ProfileInfoType,
    status: string,
    updateStatus: (status: string) => void
}
export const Profile = (props: ProfileType) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profileInfo={props.profileInfo} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}