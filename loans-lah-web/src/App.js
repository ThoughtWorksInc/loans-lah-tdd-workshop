import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import styled from "styled-components";
import {
    Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import { UserProvider } from './UserContext'
import User, {GUEST_USER} from "./models/User";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NewLoanPage from "./components/NewLoanPage";
import RegisterPage from "./components/RegisterPage";
import LoansPage from "./components/LoansPage";
import LoanDetailsPage from "./components/LoanDetailsPage";

const MainContainer = styled(Container)`
    margin-top: 1rem;
`;

function App({ history }) {
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
        history.push("/loans");
    }

    function handleRegisterSuccess() {
        history.push("/login");
    }

    function handleAlreadyLoggedInUser() {
        history.push("/loans");
    }

    function handleLoanCreated() {
        history.push('/loans')
    }

    function handleLogout() {
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("loggedInUser");
        setUser(GUEST_USER);
        history.push("/login");
        return null;
    }

    return (
        <Router history={history}>
            <UserProvider value={user}>
                <Header/>
                <MainContainer>
                    <Switch>
                        <Route exact path="/" render={() => (
                            user.loggedIn ? (
                                <Redirect to="/loans"/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        )}/>
                        <Route exact path="/login">
                            <LoginPage onSuccess={handleLoginSuccess} onUserLoggedIn={handleAlreadyLoggedInUser}/>
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage onSuccess={handleRegisterSuccess} onUserLoggedIn={handleAlreadyLoggedInUser}/>
                        </Route>
                        <AuthenticatedRoute exact path="/loans/new">
                            <NewLoanPage onSuccess={handleLoanCreated} />
                        </AuthenticatedRoute>
                        <AuthenticatedRoute exact path="/loans">
                            <LoansPage />
                        </AuthenticatedRoute>
                        <AuthenticatedRoute path="/loans/:loanId" render={({ match }) => {
                            return <LoanDetailsPage loanId={match.params.loanId} /> ;
                        }}/>
                        <AuthenticatedRoute exact path="/logout" render={handleLogout}/>
                    </Switch>
                </MainContainer>
            </UserProvider>
        </Router>
    );
}

export default App;
