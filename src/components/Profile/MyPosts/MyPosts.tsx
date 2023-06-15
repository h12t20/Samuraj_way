import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
            <div>
                My posts
                <div>
                    <textarea></textarea>
                    <button>Add post</button>
                </div>
                <Post message='Hi! How are you?!' likesCount={23}/>
                <Post message='Im Okey. And you?' likesCount={32}/>
                <Post message='Very good' likesCount={11}/>
                <Post message='Realy?' likesCount={4}/>
            </div>
            )
        }