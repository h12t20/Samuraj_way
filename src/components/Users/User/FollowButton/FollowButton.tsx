import React, {useState} from "react";

type FollowButtonType = {
    userID: number,
    followed: boolean
    followUsers: (isFollow: boolean, userID: number, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>)=>void
}
export const FollowButton = (props: FollowButtonType) => {
    const [isDisableButton, setDisableButton] = useState(false);
    return <div>{!props.followed && <button disabled={isDisableButton} onClick={() => {
        props.followUsers(true, props.userID, setDisableButton)}}>Follow</button>}
        {props.followed && <button disabled={isDisableButton} onClick={() => {
            props.followUsers(false, props.userID, setDisableButton)}}>Unfollow</button>}
    </div>
}