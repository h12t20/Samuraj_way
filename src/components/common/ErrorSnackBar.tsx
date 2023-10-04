import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {useDispatch} from "react-redux";
import {setGlobalError} from "../../Redux/app_reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function ErrorSnackbar(props: {error:unknown}) {
    const dispatch = useDispatch();
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setGlobalError(null ));
    };
    return (
        <Snackbar open={!!props.error} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {props.error} 😠
            </Alert>
        </Snackbar>
    );
}
