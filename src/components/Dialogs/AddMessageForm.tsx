import {Field, InjectedFormProps} from "redux-form";
import React from "react";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from './AddMessageForm.module.css'
const maxLength50=maxLengthCreator(500);
export const AddMessageForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <button className={s.button}>Add message</button>
            </div>
            <div><Field className={s.input} component={Textarea} name='dialogsTextArea' placeholder='Dialog message'
                        validate={[required, maxLength50]}></Field></div>

        </form>
    )
}