import React, { useState, useContext } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import styled from 'styled-components';
import API from '../services/api';
import UserContext from "../UserContext";

const RegisterLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function LoginPage({ onSuccess }) {
    const user = useContext(UserContext);

    if (user.loggedIn) {
        return <Redirect to="/" />;
    }

    let usernameInput = "";
    let passwordInput = "";
    function handleLogin(event) {
        event.preventDefault();
        let username = usernameInput.value;
        let password = passwordInput.value;
        return API.login(username, password)
            .then(jwt => onSuccess({ jwt, username }));
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
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

export default LoginPage;