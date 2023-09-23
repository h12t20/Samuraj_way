import React from "react";
import s from './ProfileStatus.module.css'
import {EditableSpan} from "../../../common/EditableSpan";
type ProfileStatusPropsType={
    status:string,
    updateStatus: (status: string) => void
}

export const ProfileStatus = React.memo((props:ProfileStatusPropsType) => {
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, inputTitle: string) => {
        if (e.key === 'Enter' && inputTitle.length < 300) props.updateStatus(inputTitle)}
    return (
        <div >
            <EditableSpan className={s} defaultInputTitleValue={props.status? props.status:''}
                          verificationRule={value => value.length<=300}
                          labelText={props.status? props.status: 'no status'}
                          onKeyPress={onKeyPress} id='profileStatus'/>
        </div>
    )

})