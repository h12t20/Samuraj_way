import {UserType} from "../../../../Redux/users_reducer";
import React, {useState} from "react";
import {followAPI} from "../../../../api/followAPI";

type FollowButtonType = {
    u: UserType,
    follow: (userId: number) => void
}
export const FollowButton = (props: FollowButtonType) => {
    const [followInProgress, setFollowingProgress] = useState(false)
    return (<div>{!props.u.followed && <button disabled={followInProgress} onClick={() => {
        setFollowingProgress(true);
        followAPI.follow(props.u)
            .then(data => {
                if (data.resultCode === 0) {
                    setFollowingProgress(false);
                    props.follow(props.u.id)
                }
            })
    }}>Follow</button>}
        {props.u.followed && <button disabled={followInProgress} onClick={() => {
            setFollowingProgress(true);
            followAPI.unfollow(props.u)
                .then(data => {
                    if (data.resultCode === 0) {
                        setFollowingProgress(false);
                        props.follow(props.u.id)
                    }
                })
        }}>Unfollow</button>}
    </div>)
}