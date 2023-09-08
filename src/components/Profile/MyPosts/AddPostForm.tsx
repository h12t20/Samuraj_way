import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, InjectedFormProps} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import React from "react";

const maxLength30 = maxLengthCreator(30)
export const AddPostForm = (props: InjectedFormProps) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name='postTextArea' placeholder='Post message'
                        validate={[required, maxLength30]}></Field></div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}