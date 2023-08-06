import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {MessageType} from "../../Redux/redux_store";

type DialogsPropsType = {
    messagesPage: MessageType
    inputMessageHandler:(event:ChangeEvent<HTMLTextAreaElement>)=>void,
    addMessageHandler:()=>void
}

export const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.messagesPage.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)
    let messagesElements = props.messagesPage.messageData.map(message =>
        <Message key={message.id} author={message.author} text={message.text}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div><textarea value={props.messagesPage.newMessageTitle}
                               onChange={(event) =>
                                   props.inputMessageHandler(event)}></textarea></div>
                <div>
                    <button onClick={props.addMessageHandler}>Add message</button>
                </div>

            </div>
        </div>
    )
}