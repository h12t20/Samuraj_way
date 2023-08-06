import React, {ChangeEvent} from "react";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {addPostAC, inputPostAC} from "../../../Redux/profile_reducer";
import {ActionType, StateType} from "../../../Redux/redux_store";
const mapStateToProps=(state:StateType)=>({
        profilePage: state.profilePage
    })

const mapDispatchToProps=(dispatch:(action:ActionType)=>void)=>{
    return {
        inputPostHandler: (event:ChangeEvent<HTMLTextAreaElement>)=>{
            dispatch(inputPostAC(event))
        },
        addPostHandler:()=>dispatch(addPostAC())
    }
}
export const MyPostsContainer=connect(mapStateToProps,mapDispatchToProps)(MyPosts)