import React, {ChangeEvent, useState} from "react";
import {CSSType} from "./Pagination";

type EditableSpanPropsType = {
    id:string
    defaultInputTitleValue: string
    labelText: string
    onKeyPress: (e:React.KeyboardEvent<HTMLInputElement>,inputTitle:string)=>void
    verificationRule:(value:string)=>boolean,
    className:CSSType
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [inputTitle, setInputTitle] = useState(props.defaultInputTitleValue);
    const [editableSpanVision, setEditableSpanVision] = useState(false);
    return (
        editableSpanVision ?
            <input id={props.id} className={props.className.inputPagination} autoFocus={true} value={inputTitle}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                       const value: string | null = e.currentTarget.value
                       if (props.verificationRule(value)) setInputTitle(value)
                   }}
                   onKeyPress={(e:React.KeyboardEvent<HTMLInputElement>)=>{props.onKeyPress(e, inputTitle)
                       if (e.key==='Enter') {setEditableSpanVision(!editableSpanVision);
                       setInputTitle('1')}
            }}
                   onBlur={() => {
                       setEditableSpanVision(!editableSpanVision);
                       setInputTitle('1')
                   }} title='Type and press Enter'/> :
            <span className={props.className.pagination} onClick={() => {
                setEditableSpanVision(!editableSpanVision);
                setInputTitle(props.defaultInputTitleValue)
            }}> {props.labelText} </span>)
})