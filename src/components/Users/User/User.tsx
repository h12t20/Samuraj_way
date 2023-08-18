import {UserType} from "../../../Redux/users_reducer";
import {NavLink} from "react-router-dom";
import s from "../Users.module.css";
import userPhoto from "../../../assets/images/user.svg";
import React from "react";
import {FollowButton} from "./FollowButton/FollowButton";

export type UserPropsType = {
    u: UserType,
    follow: (userId: number) => void;
}
export const User = (props: UserPropsType) => {
    return (
        <div key={props.u.id}>
                    <span>
                        <NavLink to={'/profile/' + props.u.id}>
                        <div><img className={s.avatar} src={props.u.photos.small ? props.u.photos.small : userPhoto}
                                  alt='avatar'/>
                        </div>
                        </NavLink>
                        <div>
                           <FollowButton u={props.u} follow={props.follow}/>
                        </div>
                                </span>
            <span>
                                <div>{props.u.name}</div>
                            <div>{props.u.status}</div>
                        </span>
        </div>)
}
