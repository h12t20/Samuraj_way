import {Field, InjectedFormProps} from "redux-form";
import React from "react";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
const maxLength50=maxLengthCreator(500)
export const AddMessageForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name='dialogsTextArea' placeholder='Dialog message'
                        validate={[required, maxLength50]}></Field></div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}