import React, {ChangeEvent, useState} from "react";
import s from "../Users/Users.module.css";

type EditableSpanPropsType = {
    curPage: number
    pagesCount: number
    onPageChanged: (page: number) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [inputPaginationTitle, setInputPaginationTitle] = useState(1);
    const [editableSpanVision, setEditableSpanVision] = useState(false);
    return (
        editableSpanVision ?
        <input className={s.inputPagination} autoFocus={true} value={inputPaginationTitle}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                   const page:number | null = e.currentTarget.value==''? 0:+e.currentTarget.value;
                   if (page >= 0 && page <= props.pagesCount) setInputPaginationTitle(page)
               }}
               onKeyPress={e => {
                   const val = inputPaginationTitle;
                   if (e.key === 'Enter' && val > 0 && val <= props.pagesCount) props.onPageChanged(inputPaginationTitle)
               }}
               onBlur={() => {
                   setEditableSpanVision(!editableSpanVision);
                   setInputPaginationTitle(1)
               }}/> :
        <span className={s.pagination} onClick={() => {
            setEditableSpanVision(!editableSpanVision);
            setInputPaginationTitle(props.curPage)
        }}> ... </span>)
}