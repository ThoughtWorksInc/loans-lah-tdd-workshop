import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styled from "styled-components";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { UserProvider } from './UserContext'
import User, {GUEST_USER} from "./models/User";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import LoanForm from "./components/LoanForm";
import RegisterForm from "./components/RegisterForm";

const MainContainer = styled(Container)`
    margin-top: 1rem;
`;

function App() {
    const defaultUser = sessionStorage.getItem("loggedInUser") ? new User(sessionStorage.getItem("loggedInUser"), true) : GUEST_USER;
    const [user, setUser] = useState(defaultUser);

    function handleLoginSuccess({ jwt, username }) {
        sessionStorage.setItem("jwt", jwt);
        sessionStorage.setItem("loggedInUser", username);
        setUser(new User(username, true));

    }

    function handleRegisterSuccess({ jwt, username }) {
        sessionStorage.setItem("jwt", jwt);
        sessionStorage.setItem("loggedInUser", username);
        setUser(new User(username, true));
    }

    return (
        <Router>
            <UserProvider value={user}>
                <Header/>
                <MainContainer>
                    <Switch>
                        <Route path="/login">
                            <LoginForm onSuccess={handleLoginSuccess}/>
                        </Route>
                        <Route path="/register">
                            <RegisterForm onSuccess={handleRegisterSuccess} />
                        </Route>
                        <AuthenticatedRoute path="/loans/new">
                            <LoanForm />
                        </AuthenticatedRoute>
                    </Switch>
                </MainContainer>
            </UserProvider>
        </Router>
    );
}

export default App;
