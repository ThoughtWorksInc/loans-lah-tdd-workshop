import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {Redirect} from "react-router-dom";
import API from '../services/api';
import UserContext from "../UserContext";

const LoginLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function RegisterForm() {
    const user = useContext(UserContext);
    const [registered, setRegistered] = useState(false);

    function renderRedirect() {
        if (user.loggedIn) {
            return <Redirect to="/"/>;
        } else if (registered) {
            return <Redirect to="/login"/>;
        }
        return '';
    }

    let usernameInput = "";
    let passwordInput = "";
    function handleRegister(event) {
        event.preventDefault();
        let username = usernameInput.value;
        let password = passwordInput.value;
        return API.register(username, password)
            .then(result => {
                setRegistered(true);
            });
    }

    return (
        <div>
            {renderRedirect()}
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={(input) => { usernameInput = input; }}/>
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={(input) => { passwordInput = input; }}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <LoginLink href="/login">Already had an account? Login here!</LoginLink>
        </div>
    )
}

export default RegisterForm;