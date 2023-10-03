import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../Redux/redux_store";
import s from './Profile.module.css'

type ProfileType = {
    isOwner:boolean
    profileInfo: ProfileInfoType,
    status: string,
    updateStatus: (status: string) => void,
    savePhoto: (file: File)=>void,
    profileEditMode: boolean,
    setProfileEditMode: (mode:boolean)=>void,
    isFormSubmitSuccess: boolean
}
export const Profile = (props: ProfileType) => {
    return (
        <div className={s.profile}>
            <ProfileInfo savePhoto={props.savePhoto} isOwner = {props.isOwner} profileInfo={props.profileInfo}
                         status={props.status} updateStatus={props.updateStatus} profileEditMode={props.profileEditMode}
                         setProfileEditMode={props.setProfileEditMode} isFormSubmitSuccess = {props.isFormSubmitSuccess}/>
            <MyPostsContainer/>
        </div>
    )
}