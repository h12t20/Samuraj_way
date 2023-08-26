import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileInfoType} from "../../Redux/redux_store";

type ProfileType = {
    profileInfo: ProfileInfoType,
    status: string,
    updateStatus: (status: string) => void
}
export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo profileInfo={props.profileInfo} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}