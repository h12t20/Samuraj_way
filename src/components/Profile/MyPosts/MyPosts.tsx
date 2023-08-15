import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

import {PostDataType} from "../../../Redux/redux_store";

type MyPostsPropsType = {
    postData: PostDataType[],
    newPostTitle:string,
    inputPostHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    addPostHandler: () => void
}

export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.postData.map(post =>
        <Post key={post.id} message={post.message}
              likesCount={post.likesCount}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div><textarea value={props.newPostTitle}
                               onChange={(event) =>
                                   props.inputPostHandler(event)}></textarea></div>
                <div>
                    <button onClick={props.addPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}