import React from 'react';
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
    const user = GUEST_USER;

    return (
        <Router>
            <UserProvider value={user}>
                <Header/>
                <MainContainer>
                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/register">
                            <RegisterForm />
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
