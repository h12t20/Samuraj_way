import s from "../Users/Users.module.css";
import React from "react";

export const Preloader = () => {
    return (<svg className={s.spinner} viewBox="0 0 50 50">
        <circle className={s.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>)
}