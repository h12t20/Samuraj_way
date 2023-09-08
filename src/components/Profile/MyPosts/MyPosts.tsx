import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

import {PostDataType} from "../../../Redux/redux_store";
import {reduxForm} from "redux-form";
import {AddPostForm} from "./AddPostForm";

type MyPostsPropsType = {
    postData: PostDataType[],
    newPostTitle:string,
    addPostHandler: (newPost:string) => void
}
export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.postData.map(post =>
        <Post key={post.id} message={post.message}
              likesCount={post.likesCount}/>)
    const addNewPost=(values:any)=>{
props.addPostHandler(values.postTextArea)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddPostFormRedux onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
const AddPostFormRedux=reduxForm({form:'profileAddPostForm'})(AddPostForm)