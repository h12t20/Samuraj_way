import React, {useEffect} from "react";
import {UsersType} from "../../Redux/redux_store";
import s from './Users.module.css'
import axios from "axios";
import {UserType} from "../../Redux/users_reducer";
import userPhoto from '../../assets/images/user.svg'

type UsersPropsType = {
    usersPage: UsersType;
    follow: (userId: number) => void;
    setUsers: (users: UserType[]) => void
}
export const Users = (props: UsersPropsType) => {
    const getUsers = () => {
        if (props.usersPage.userData.length===0)
            axios
                .get('https://social-network.samuraijs.com/api/1.0//users')
                .then(response => {
                    props.setUsers(response.data.items)
                })

    }

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {props.usersPage.userData.map(u =>
                <div key={u.id}>
                    <span>
                        <div><img className={s.avatar} src={u.photos.small ? u.photos.small : userPhoto} alt='avatar'/></div>
                        <div><button
                            onClick={() => props.follow(u.id)}>{u.followed ? 'Unfollow' : 'Follow'}</button></div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.status}</div>
                        </span>

                    </span>
                </div>
            )}

        </div>
    )
}