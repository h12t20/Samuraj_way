import React, {ChangeEvent, useState} from "react";
import {UsersType} from "../../Redux/redux_store";
import s from '../Users/Users.module.css'

type UsersPropsType = {
    usersPage: UsersType;
    onPageChanged:(page:number)=>void
}

export const Pagination = (props:UsersPropsType) => {
   const [inputPaginationTitle, setInputPaginationTitle]=useState(1);
   const [editableSpanVision, setEditableSpanVision]=useState(false);
    const pagesCount = Math.ceil(props.usersPage.totalCount / props.usersPage.pageSize);
    const pages = [];
    if (pagesCount < 21) {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    } else {
        for (let i = 1; i < 11; i++) {
            pages.push(i)
        }
    }
    return (
        <div className={s.container}>
            <div className={s.paginationBlock}>
                {pages.map(p => <span key={p} className={s.pagination} style={props.usersPage.currentPage === p ?
                    {fontWeight: "bold"} : {}} onClick={() => {
                    props.onPageChanged(p)
                }}>{p}</span>)}
                {props.usersPage.totalCount > 20 && editableSpanVision ?
                    <input className={s.inputPagination} autoFocus={true}
                           value={inputPaginationTitle}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               const page = +e.currentTarget.value;
                               if (page > 0 && page <= pagesCount) setInputPaginationTitle(page)
                           }}
                           onKeyPress={event => {
                               const val = inputPaginationTitle;
                               if (event.key === 'Enter' && val > 0 && val <= pagesCount)
                                   props.onPageChanged(inputPaginationTitle)
                           }}
                           onBlur={() => {setEditableSpanVision(!editableSpanVision);
                           setInputPaginationTitle(1)}}/> :
                    <span className={s.pagination}
                          onClick={() => {setEditableSpanVision(!editableSpanVision);
                          setInputPaginationTitle(props.usersPage.currentPage)}}> ... </span>}
                {props.usersPage.totalCount > 20 && <span className={s.pagination} onClick={() => {
                    props.onPageChanged(props.usersPage.currentPage < pagesCount ?
                        props.usersPage.currentPage + 1 : pagesCount)
                }}>вперёд {(String.fromCharCode(62)).repeat(2)}</span>}
            </div>
        </div>
    )
}

