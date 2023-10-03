import {ContactType} from "../../../Redux/redux_store";
import s from "./ProfileInfo.module.css";
import React from "react";

export const Contacts = (props: ContactType) => {
    let arrayJSX: JSX.Element[] = []
    for (let i = 0; i < Object.keys(props).length; i++) {
        if (Object.entries(props)[i][1])
            arrayJSX.push(<div><span>{Object.entries(props)[i][0]}</span>: <span className={s.contactValue}>
                {Object.entries(props)[i][1]}</span></div>)
    }
    return (<div className={s.contactBlock}>
            {arrayJSX.length>0 && 'Contacts: '}
            {arrayJSX.map(jsx => <div className={s.contacts} key={arrayJSX.indexOf(jsx)}>{jsx}</div>)}
        </div>
    )
}