import React, {useState} from "react";
import s from './FollowButton.module.css'

type FollowButtonType = {
    userID: number,
    followed: boolean
    followUsers: (isFollow: boolean, userID: number, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>)=>void
}
export const FollowButton = (props: FollowButtonType) => {
    const [isDisableButton, setDisableButton] = useState(false);
    return <div>{!props.followed && <button disabled={isDisableButton} onClick={() => {
        props.followUsers(true, props.userID, setDisableButton)}}><div className={s.container}><div className={s.follow}></div>Follow</div></button>}
        {props.followed && <button disabled={isDisableButton} onClick={() => {
            props.followUsers(false, props.userID, setDisableButton)}}><div className={s.container}><div className={s.unfollow}></div>Unfollow</div></button>}
    </div>
}