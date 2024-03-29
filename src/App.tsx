import React, {ComponentType, lazy, ReactNode, Suspense} from "react";
import './App.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Switch} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {globalErrorHandler, initializeApp} from "./Redux/app_reducer";
import {StateType} from "./Redux/redux_store";
import {Preloader} from "./components/common/Preloader";
import {lazily} from "react-lazily";
import {ErrorSnackbar} from "./components/common/ErrorSnackBar";

const {DialogsContainer} = lazily(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer")
    .then((ProfileContainer) => ProfileContainer as {
        default: ComponentType<any>
    }));
const UsersContainer = lazy(() => import("./components/Users/UsersContainer")
    .then((UsersContainer) => UsersContainer as {
        default: ComponentType<any>
    }));

class App extends React.Component<{
    initializeApp: () => void,
    initApp: boolean,
    error: unknown
}, {
    children?: ReactNode
}> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        globalErrorHandler(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initApp) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <ErrorSnackbar error={this.props.error}/>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div><Preloader/></div>}>
                        <Switch>
                            <Route exact path='/'><ProfileContainer/></Route>
                            <Route path='/news'><News/></Route>
                            <Route path='/music'><Music/></Route>
                            <Route path='/profile/:id?'><ProfileContainer/></Route>
                            <Route path='/dialogs'><DialogsContainer/></Route>
                            <Route path='/settings'><Settings/></Route>
                            <Route path='/users'><UsersContainer/></Route>
                            <Route path='/login'><Login/></Route>
                            <Route path='*'>
                                <div>404 NOT FOUND</div>
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StateType) => ({
    initApp: state.app.initialized,
    error: state.app.globalError
});
export default connect(mapStateToProps, {initializeApp})(App)