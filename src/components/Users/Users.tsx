import React from "react";
import {UsersType} from "../../Redux/redux_store";
import s from './Users.module.css'
import {UserType} from "../../Redux/users_reducer";
import {Pagination} from "../common/Pagination";
import {User} from "./User/User";

type UsersPropsType = {
    usersPage: UsersType;
    onPageChanged: (page: number | string) => void;
    followUsers: (isFollow: boolean, userId: number, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>)=>void
}

export const Users = (props: UsersPropsType) => {
    return (
        <div className={s.container}>
            <Pagination usersPage={props.usersPage} onPageChanged={props.onPageChanged}/>
            {props.usersPage.userData.map((u: UserType) =>
                <User key={u.id} u={u} followUsers={props.followUsers}/>
            )}
        </div>
    )
}
