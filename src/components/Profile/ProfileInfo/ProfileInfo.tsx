import React, {ChangeEvent, useEffect, useRef} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader";
import user from '../../../assets/images/user.svg'
import {ProfileInfoType} from "../../../Redux/redux_store";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";
import {ProfileViewMode} from "./ProfileViewMode";
import {reduxForm} from "redux-form";
import {connect, useDispatch} from "react-redux";
import {updateProfile} from "../../../Redux/profile_reducer";
import {ProfileEditMode} from "./ProfileEditMode";

type ProfileInfoPropsType = {
    isOwner: boolean
    profileInfo: ProfileInfoType,
    status: string,
    updateStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    profileEditMode: boolean,
    setProfileEditMode: (mode:boolean)=>void,
    isFormSubmitSuccess: boolean
}
export const ProfileInfo = (props: ProfileInfoPropsType) => {
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) props.savePhoto(e.target.files[0])
    }
    const inputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    function handleClick() {
        inputRef && inputRef.current?.click()
    }

    function mouseOverHandler() {
        if (props.isOwner && imgRef.current) {
           imgRef.current.className = s.mouseOver}
    }

    function mouseLeaveHandler() {
        if (props.isOwner && imgRef.current) {imgRef.current.className = s.label}
    }

    if (!props.profileInfo) return <Preloader/>
    return (
        <div>
            <div className={s.descriptionBlock}>
                <div onMouseOver={mouseOverHandler} onMouseLeave={mouseLeaveHandler}
                     className={s.mainPhotoContainer} style={props.isOwner? {cursor:'pointer'}:undefined} onClick={handleClick}>
                    <img className={s.ava} src={props.profileInfo.photos.large ? props.profileInfo.photos.large :
                        props.profileInfo.photos.small ? props.profileInfo.photos.small : user}
                         alt='photo'/></div>
                <div>
                <div className={s.labelContainer}>{props.isOwner &&
                    <div className={s.label} ref={imgRef}>Press to refresh</div>}</div>
                  <div className={s.viewModes}>  {props.profileEditMode? <ProfileEdit setViewMode={
                      ()=>props.setProfileEditMode(false)} profile={props.profileInfo} profileEditMode={props.profileEditMode}
                                                                                      isFormSubmitSuccess = {props.isFormSubmitSuccess}/>:
                        <ProfileViewMode profile={props.profileInfo} isOwner={props.isOwner} setToEditMode={
                            ()=>props.setProfileEditMode(true)}/>}
                  </div>

                {props.isOwner &&
                    <div><input className={s.sendPhotoInput} type="file" accept={'image/*'} ref={inputRef} onChange={onMainPhotoSelected}/>
                    </div>}
                </div>
            </div>
            <div className={s.descriptionBlock}>{props.isOwner? <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>:
                <div>Status: <span className={s.contactValue}>{props.status? props.status: 'No status'}</span></div> }</div>
        </div>
    )
}

const ProfileReduxForm = reduxForm<ProfileInfoType>({form: 'profile'})(ProfileEditMode)
const ProfileEdit = (props: {profile: ProfileInfoType, setViewMode: ()=>void, profileEditMode:boolean, isFormSubmitSuccess: boolean} ) => {
    useEffect(() => {
        if (props.isFormSubmitSuccess && props.profileEditMode) props.setViewMode()
    }, [props.isFormSubmitSuccess, props.profileEditMode]);
    const dispatch=useDispatch()
    const onSubmit = async (formData: ProfileInfoType) => {
       dispatch(updateProfile(formData))
    }
    return (
        <div className={s.container}>
                <ProfileReduxForm onSubmit={onSubmit} initialValues={props.profile}/>
        </div>
    )
}
export default connect(null, {updateProfile})(ProfileEdit)