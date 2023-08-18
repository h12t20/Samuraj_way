import React from "react";
import {UsersType} from "../../Redux/redux_store";
import s from '../Users/Users.module.css'
import {EditableSpan} from "./EditableSpan";

type UsersPropsType = {
    usersPage: UsersType;
    onPageChanged: (page: number) => void
}
export const Pagination = (props: UsersPropsType) => {
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
    return (
        <div className={s.container}>
            <div className={s.paginationBlock}>
                {curPage >5 && <span className={s.pagination} style={curPage === 1 ?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(1)}}>1</span>}
                {curPage>5 &&
                <EditableSpan curPage={curPage} onPageChanged={props.onPageChanged} pagesCount={pagesCount}/>}
                {pages.map(p => <span key={p} className={s.pagination} style={curPage === p ?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(p)}}>{p}</span>)}
                {pagesCount>8 && curPage<pagesCount-3 &&
                    <EditableSpan curPage={curPage} onPageChanged={props.onPageChanged} pagesCount={pagesCount}/>}
                {pagesCount>6 && curPage < pagesCount-2 && <span className={s.pagination} style={curPage === pagesCount ?
                    {fontWeight: "bold"} : {}} onClick={() => {props.onPageChanged(pagesCount)}}>{pagesCount}</span>}
                {totalCount > 20 && curPage > 1 && <span className={s.pagination} onClick={() => {
                        props.onPageChanged(curPage >1 ?
                            curPage - 1 : pagesCount)
                    }}>{(String.fromCharCode(60)).repeat(2)} назад</span>}
                {totalCount > 20 && <span className={s.pagination} onClick={() => {
                    props.onPageChanged(curPage < pagesCount ? curPage + 1 : pagesCount)
                }}>вперёд {(String.fromCharCode(62)).repeat(2)}</span>}
            </div>
        </div>
    )
}

