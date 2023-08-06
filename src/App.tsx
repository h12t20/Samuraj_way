import React from "react";
import './App.css'
import {Header} from './components/Header/Header'
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {store} from "./Redux/redux_store";
const state=store.getState();
export const App = () => {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/news'><News/></Route>
                <Route path='/music'><Music/></Route>
                <Route path='/profile'><Profile profilePage={state.profilePage}/></Route>
                <Route path='/dialogs'><DialogsContainer/></Route>
                <Route path='/settings'><Settings/></Route>
                <Route path='/users'><UsersContainer /></Route>
            </div>
        </div>
    )
}
