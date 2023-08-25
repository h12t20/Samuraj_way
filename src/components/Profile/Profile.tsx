import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../Redux/redux_store";
export const Profile = (props: {profileInfo: ProfileInfoType}) => {
    return (
        <div>
            <ProfileInfo profileInfo={props.profileInfo}/>
            <MyPostsContainer />
        </div>
    )
}