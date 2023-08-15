import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../Redux/redux_store";
export type ProfilePropsType = { profileInfo: ProfileInfoType }
export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profileInfo={props.profileInfo}/>
            <MyPostsContainer />
        </div>
    )
}