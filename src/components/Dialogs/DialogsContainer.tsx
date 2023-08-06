import React, {ChangeEvent} from "react";
import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {addMessageAC, inputMessageAC} from "../../Redux/dialogs_reducer";
import {ActionType, StateType} from "../../Redux/redux_store";

const mapStateToProps = (state: StateType) => {
    return {
        messagesPage: state.messagesPage
    }
}
const mapDispatchToProps = (dispatch: (action: ActionType) =>
    void) => {
    return {
        inputMessageHandler: (event: ChangeEvent<HTMLTextAreaElement>) => dispatch(inputMessageAC(event)),
        addMessageHandler: () => dispatch(addMessageAC())
    }
}
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)