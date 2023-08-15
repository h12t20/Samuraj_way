import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {addPost, inputPost} from "../../../Redux/profile_reducer";
import {ActionType, StateType} from "../../../Redux/redux_store";
const mapStateToProps=(state:StateType)=>({
    postData: state.profilePage.postsData,
    newPostTitle: state.profilePage.newPostTitle,
    })

const mapDispatchToProps=(dispatch:(action:ActionType)=>void)=>{
    return {
        inputPostHandler: (event:ChangeEvent<HTMLTextAreaElement>)=>{
            dispatch(inputPost(event))
        },
        addPostHandler:()=>dispatch(addPost())
    }
}
export const MyPostsContainer=connect(mapStateToProps,mapDispatchToProps)(MyPosts)