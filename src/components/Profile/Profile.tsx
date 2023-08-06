import React, {ChangeEvent} from "react";
import s from './Profile.module.css'
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Redux/redux_store";
type PtofilePropsType = {
    profilePage: ProfileType,
}
export const Profile = (props: PtofilePropsType) => {
    return (
        <div>
            <ProfileInfo profileInfo={props.profilePage.profileInfo}/>
            <MyPostsContainer />
        </div>
    )
}