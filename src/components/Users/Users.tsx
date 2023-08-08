import React from "react";
import {UsersType} from "../../Redux/redux_store";
import s from './Users.module.css'
import {UserType} from "../../Redux/users_reducer";
import userPhoto from '../../assets/images/user.svg'
import {Pagination} from "../Pagination/Pagination";

type UsersPropsType = {
    usersPage: UsersType;
    follow: (userId: number) => void;
    onPageChanged: (page: number) => void
}

export const Users = (props: UsersPropsType) => {
    return (
        <div className={s.container}>
            <Pagination usersPage={props.usersPage} onPageChanged={props.onPageChanged}/>
            {props.usersPage.userData.map((u: UserType) =>
                <div key={u.id}>
                    <span>
                        <div><img className={s.avatar} src={u.photos.small ? u.photos.small : userPhoto}
                                  alt='avatar'/></div>
                        <div><button
                            onClick={() => props.follow(u.id)}>{u.followed ? 'Unfollow' : 'Follow'}</button></div>
                    </span>
                    <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                </div>
            )}
        </div>
    )
}

