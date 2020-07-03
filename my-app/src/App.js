import React, { useReducer, createContext } from 'react';
import './App.css';
import { Route, Switch, HashRouter, Link } from "react-router-dom";
import Home from "./components/homeComponent";
import Contact from "./components/contactComponent";
import SignIn from "./components/signinComponent";
import SignUp from "./components/signupComponent";
import { Container, Row, Col, Nav, Navbar, ButtonToolbar, Button, ButtonGroup } from "react-bootstrap"

export const UserContext = createContext();

const initialState = {
    isAuthenticated: false,
    username: null,
    access: null,
    refresh: null,
    menu: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                access: action.payload.access,
                refresh: action.payload.refresh,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                username: null,
                access: null,
                refresh: null
            };
        case "GET_MENU":
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state;
    }
};

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            <HashRouter>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand  href="/"><div id="pizza-brand">Pine's Pizza</div></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </Nav>
                    { !state.isAuthenticated
                        ?   
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2" aria-label="First group">
                                    <SignIn />
                                </ButtonGroup>
                                <ButtonGroup className="mr-2" aria-label="Second group">
                                    <SignUp />
                                </ButtonGroup>
                            </ButtonToolbar>
                        :
                            <div id="user-name">Welcome, {state.username}</div>
                    }
                </Navbar>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/contact" component={Contact}/>
                </Switch>
            </HashRouter>
        </UserContext.Provider>
    );
}

export default App;
