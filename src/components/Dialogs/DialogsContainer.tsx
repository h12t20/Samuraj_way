import {ChangeEvent} from "react";
import {connect} from "react-redux";
import {Dialogs} from "./Dialogs";
import {addMessageAC, inputMessageAC} from "../../Redux/dialogs_reducer";
import {ActionType, StateType} from "../../Redux/redux_store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const mapStateToProps = (state: StateType) => ({messagesPage: state.messagesPage})
const mapDispatchToProps = (dispatch: (action: ActionType) => void) => ({
        inputMessageHandler: (event: ChangeEvent<HTMLTextAreaElement>) => dispatch(inputMessageAC(event)),
        addMessageHandler: () => dispatch(addMessageAC())
    })
const AuthRedirectComponent=withAuthRedirect(Dialogs)
export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)