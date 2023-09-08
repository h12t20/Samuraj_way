import React from "react";
import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {addMessageAC} from "../../Redux/dialogs_reducer";
import {ActionType, StateType} from "../../Redux/redux_store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state: StateType) => ({messagesPage: state.messagesPage})

const mapDispatchToProps = (dispatch: (action: ActionType) => void) => ({
        addMessageHandler: (newMessage:string) => dispatch(addMessageAC(newMessage))
    })
export const DialogsContainer =
    compose<React.ElementType>(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs)
