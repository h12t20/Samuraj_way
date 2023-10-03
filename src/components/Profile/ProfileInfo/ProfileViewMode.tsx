import {ProfileInfoType} from "../../../Redux/redux_store";
import s from "./ProfileInfo.module.css";
import {Contacts} from "./Contacts";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setFormSubmitStatus} from "../../../Redux/profile_reducer";

export const ProfileViewMode = (props: {profile: ProfileInfoType, isOwner:boolean, setToEditMode:()=>void}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setFormSubmitStatus(false))
    }, []);
    return (
        <div className={s.container}>
            <div className={s.name}>Full name: <span className={s.contactValue}>{props.profile.fullName}</span></div>
            <div>Looking for a job: <span className={s.contactValue}>{props.profile.lookingForAJob ? 'Yes' : 'No'}</span></div>
            {props.profile.lookingForAJob ?
                <div>Desired job: <span className={s.contactValue}>{props.profile.lookingForAJobDescription}</span></div> : null}
            {props.profile.aboutMe ? <div>About me: <span className={s.contactValue}>{props.profile.aboutMe}</span></div> : null}
            <div><Contacts {...props.profile.contacts}/></div>
            {props.isOwner && <div className={s.editBlock}><div className={s.edit} onClick={props.setToEditMode}>Edit</div></div>}
        </div>
    )
}