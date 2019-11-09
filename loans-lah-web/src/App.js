import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styled from "styled-components";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { UserProvider } from './UserContext'
import User, {GUEST_USER} from "./models/User";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NewLoanPage from "./components/NewLoanPage";
import RegisterPage from "./components/RegisterPage";
import { createBrowserHistory } from "history";

const MainContainer = styled(Container)`
    margin-top: 1rem;
`;

function App() {
    const history = createBrowserHistory();
    let defaultUser;
    if (sessionStorage.getItem("loggedInUser")) {
        defaultUser = new User(sessionStorage.getItem("loggedInUser"), sessionStorage.getItem("jwt"));
    } else {
        defaultUser = GUEST_USER;
    }
    const [user, setUser] = useState(defaultUser);

    function handleLoginSuccess({ jwt, username }) {
        sessionStorage.setItem("jwt", jwt);
        sessionStorage.setItem("loggedInUser", username);
        setUser(new User(username, jwt));
        history.push("/");
    }

    function handleRegisterSuccess() {
        history.push("/login");
    }

    return (
        <Router history={history}>
            <UserProvider value={user}>
                <Header/>
                <MainContainer>
                    <Switch>
                        <Route path="/login">
                            <LoginPage onSuccess={handleLoginSuccess}/>
                        </Route>
                        <Route path="/register">
                            <RegisterPage onSuccess={handleRegisterSuccess} />
                        </Route>
                        <AuthenticatedRoute path="/loans/new">
                            <NewLoanPage />
                        </AuthenticatedRoute>
                    </Switch>
                </MainContainer>
            </UserProvider>
        </Router>
    );
}

export default App;
