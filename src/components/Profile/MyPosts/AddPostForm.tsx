import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import React from "react";
import s from './AddPostForm.module.css'

const maxLength30 = maxLengthCreator(30)
export const AddPostForm = (props: InjectedFormProps) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <div>
                <button className={s.button}>Add post</button>
            </div>
            <div><Field className={s.input} component={Textarea} name='postTextArea' placeholder='Post message'
                        validate={[required, maxLength30]}></Field></div>
        </form>
    )
}