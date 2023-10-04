import {Field, InjectedFormProps} from "redux-form";
import {ProfileInfoType} from "../../../Redux/redux_store";
import s from "./ProfileInfo.module.css";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLength200, maxLength50} from "../../Login/Login";
import {required} from "../../../utils/validators/validators";
import React from "react";

export const ProfileEditMode = (props: InjectedFormProps<ProfileInfoType>) => {
    const {contacts} = props.initialValues
    let arrayJSX: JSX.Element[] = [];
    if (contacts) for (let i = 0; i < Object.keys(contacts).length; i++) {
        arrayJSX.push(<div className={s.field}><span>{Object.entries(contacts)[i][0]}</span> <span
            className={s.contactValue}>
                <Field autoComplete={'on'} placeholder={Object.entries(contacts)[i][0]}
                       name={'contacts.' + Object.entries(contacts)[i][0]}
                       component={Input} validate={[maxLength50]} className={s.field}/></span></div>)
    }
    return (
        <form className={s.container} onSubmit={props.handleSubmit}>
            <div className={s.field}>Full name: <Field autoComplete={'on'} placeholder={'Full name'} name={'fullName'}
                                                       component={Input} validate={[required, maxLength50]}
                                                       className={s.field}/></div>
            <div className={s.field}>Looking for a job: <Field placeholder={'Looking for a job'}
                                                               name={'lookingForAJob'} component={Input}
                                                               props={{type: 'checkbox'}}
                                                               validate={[]} className={s.field}/></div>
            <div className={s.field}>Desired job: <Field autoComplete={'on'} placeholder={'Desired job'}
                                                         name={'lookingForAJobDescription'} component={Textarea}
                                                         validate={[maxLength200]} className={s.field}/></div>
            <div className={s.field}>About me: <Field autoComplete={'on'} placeholder={'About me'} name={'aboutMe'}
                                                      component={Textarea} validate={[maxLength200]}
                                                      className={s.field}/></div>
            <div className={s.contactBlock}>
                {arrayJSX.length > 0 && 'Contacts: '}
                {arrayJSX.map(jsx => <div className={s.contacts} key={arrayJSX.indexOf(jsx)}>{jsx}</div>)}
            </div>
            <div>
                <button style={{borderRadius: 7}}>Save</button>
            </div>
        </form>
    )
}