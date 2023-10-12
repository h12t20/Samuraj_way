import React from "react";
import {UsersType} from "../../Redux/redux_store";
import s from '../common/EditableSpan.module.css'
import {EditableSpan} from "./EditableSpan";
export type CSSType= typeof s
type UsersPropsType = {
    usersPage: UsersType;
    onPageChanged: (page: number | string) => void
}
export const Pagination = React.memo((props: UsersPropsType) => {
    const totalCount=props.usersPage.totalCount;
    const curPage=props.usersPage.currentPage;
    const pagesCount = Math.ceil(totalCount / props.usersPage.pageSize);
    let pages = [];
    if (curPage < 6) {
        for (let i = 1; i<totalCount && i < 8; i++) {
            pages.push(i)
        }
    } else {
        for (let i = curPage-2; i < curPage+3 && i<=pagesCount; i++) {
            pages.push(i)
        }
    }
    const onKeyPress=(e:React.KeyboardEvent<HTMLInputElement>,inputTitle:string) => {
        if (e.key === 'Enter' && +inputTitle>0 && +inputTitle <= pagesCount) props.onPageChanged(+inputTitle)
    }
    const verificationRule: (value:string)=>boolean=(value)=>value ==='' ||
        (+value>0 && +value<=pagesCount && value.length<100);
    const editableSpanProps ={
        defaultInputTitleValue:curPage? curPage.toString():'1',
        labelText: ' ... ',
        verificationRule,
        onKeyPress,
        className: s
    }
    return (
        <div className={s.container}>
            <div className={s.paginationBlock}>
                {curPage >5 && <span className={s.pagination} style={curPage === 1 ?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(1)}}>1</span>}
                {curPage>5 && <EditableSpan {...editableSpanProps} id='firstPagination'/>}
                {pages.map(p => <span key={p} className={s.pagination} style={curPage === p?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(p)}}>{p}</span>)}
                {pagesCount>8 && curPage<pagesCount-3 && <EditableSpan {...editableSpanProps} id='secondPagination'/>}
                {pagesCount>6 && curPage < pagesCount-2 && <span className={s.pagination} style={curPage === pagesCount ?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(pagesCount)}}>{pagesCount}</span>}
                {pagesCount > 10 && curPage > 1 && <span className={s.pagination} onClick={() => {
                    props.onPageChanged(curPage >1 ? curPage - 1 : pagesCount)
                }}>{'\<<'} </span>}
                {pagesCount > 10 && curPage!== pagesCount && <span className={s.pagination} onClick={() => {
                    props.onPageChanged(curPage < pagesCount ? curPage + 1 : pagesCount)
                }} >{'\>>'}</span>}
            </div>
        </div>
    )
})