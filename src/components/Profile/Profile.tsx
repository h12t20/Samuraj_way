import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img className={s.photo}
                    src='https://static.tildacdn.com/tild3661-6435-4033-b866-663064366265/panorama-gorod-mosty.jpg' alt='фото'/>
            </div>
            <div>
                avatar + description
            </div>
            <MyPosts/>
        </div>
            )
        }