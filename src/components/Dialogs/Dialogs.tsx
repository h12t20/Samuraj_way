import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessageType} from "../../Redux/redux_store";
import {reduxForm} from "redux-form";
import {AddMessageForm} from "./AddMessageForm";

export type DialogsPropsType = {
    messagesPage: MessageType
    inputMessageHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    addMessageHandler: (newMessage:string) => void
}

export const Dialogs = (props: DialogsPropsType) => {
    const dialogsElements = props.messagesPage.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    const messagesElements = props.messagesPage.messageData.map(message =>
        <Message key={message.id} author={message.author} text={message.text}/>)
    const addNewMessage=(values: any)=>{
        props.addMessageHandler(values.dialogsTextArea)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.addMessage}><AddMessageFormRedux onSubmit={addNewMessage}/></div>
                <div className={s.messagesElements}>{messagesElements}</div>
            </div>
        </div>
    )
}
const AddMessageFormRedux=reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)