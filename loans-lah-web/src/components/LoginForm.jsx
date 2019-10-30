import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import styled from 'styled-components';
import API from '../services/api';

const RegisterLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function LoginForm() {
    const [loggedIn, setLoggedIn] = useState(false);

    function renderRedirect() {
        if (loggedIn) {
            return <Redirect to="/"/>;
        }
        return '';
    }

    let username = "";
    let password = "";
    function handleLogin(event) {
        return API.login(username, password)
            .then(jwt => {
                sessionStorage.setItem("jwt", jwt);
                setLoggedIn(true);
            });
    }

    return (
        <div>
            <Form onSubmit={handleLogin}>
                {renderRedirect()}
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={(input) => { username = input; }}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={(input) => { password = input; }}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            <RegisterLink href="/register">Register now!</RegisterLink>
        </div>
    )
}

export default LoginForm;