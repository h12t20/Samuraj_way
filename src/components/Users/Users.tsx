import React, {useEffect} from "react";
import {UsersType} from "../../Redux/redux_store";
import s from './Users.module.css'
import {UserType} from "../../Redux/users_reducer";
import {Pagination} from "../common/Pagination";
import {User} from "./User/User";
import {useLocation} from "react-router-dom";

type UsersPropsType = {
    usersPage: UsersType;
    onPageChanged: (page: number | string) => void;
    followUsers: (isFollow: boolean, userId: number, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>) => void
}

export const Users = React.memo((props: UsersPropsType) => {
    const location = useLocation();
    const page = new URLSearchParams(location.search).get('page');
    useEffect(() => {
        if (page) props.onPageChanged(+page)
    }, [page]);
    return (
        <div className={s.container}>
            <div className={s.pagination}><Pagination usersPage={props.usersPage} onPageChanged={props.onPageChanged}/>
            </div>
            <div className={s.users}>
                {props.usersPage.userData.map((u: UserType) =>
                    <User key={u.id} u={u} followUsers={props.followUsers}/>
                )}
            </div>
        </div>
    )
})
