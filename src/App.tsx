import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/registration/Login";
import Logout from "./components/registration/Logout";
import UserProfile from "./components/UserProfile";
import AddNewDevice from "./components/addNewDevice/AddNewDevice";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Navbar />
                    <h1 className="App">Welcome!</h1>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <Route exact path="/user-profile">
                    <UserProfile />
                </Route>
                <Route exact path="/add-new-device">
                    <AddNewDevice />
                </Route>
                <Route exact path="">
                    <h1 className="App">404! Page Not Found.</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
