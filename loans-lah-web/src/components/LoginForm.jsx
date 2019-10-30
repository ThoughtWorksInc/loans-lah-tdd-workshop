import React, { useState, useContext } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import styled from 'styled-components';
import API from '../services/api';
import UserContext from "../UserContext";
import User from "../models/User";

const RegisterLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function LoginForm() {
    const user = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(user.loggedIn);

    function renderRedirect() {
        if (loggedIn) {
            return <Redirect to="/"/>;
        }
        return '';
    }

    let usernameInput = "";
    let passwordInput = "";
    function handleLogin(event) {
        let username = usernameInput.value;
        let password = passwordInput.value;
        return API.login(username, password)
            .then(jwt => {
                sessionStorage.setItem("jwt", jwt);
                sessionStorage.setItem("loggedInUser", username);
                setLoggedIn(true);
            });
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                {renderRedirect()}
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={(input) => { usernameInput = input; }}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={(input) => { passwordInput = input; }}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            <RegisterLink href="/register">Register now!</RegisterLink>
        </div>
    );
}

export default LoginForm;