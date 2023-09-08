import React, {ReactNode} from "react";
import './App.css'
import {Navbar} from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/app_reducer";
import {StateType} from "./Redux/redux_store";
import {Preloader} from "./components/common/Preloader";

class App extends React.Component<{ initializeApp:()=>void, initApp:boolean }, { children?: ReactNode }>  {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initApp) { return <Preloader/>}
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/news'><News/></Route>
                    <Route path='/music'><Music/></Route>
                    <Route path='/profile/:id?'><ProfileContainer/></Route>
                    <Route path='/dialogs'><DialogsContainer/></Route>
                    <Route path='/settings'><Settings/></Route>
                    <Route path='/users'><UsersContainer/></Route>
                    <Route path='/login'><Login/></Route>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: StateType) => ({initApp:state.app.initialized});
export default connect(mapStateToProps, {initializeApp})(App)