import React, {useContext, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import styled from 'styled-components';
import API from '../services/api';
import UserContext from "../UserContext";

const LoginLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

/**
 * @return {null}
 */
function RegisterPage({ onSuccess, onUserLoggedIn }) {
    const user = useContext(UserContext);
    const [formErrors, setFormErrors] = useState({});

    if (user.loggedIn) {
        onUserLoggedIn();
        return null;
    }

    let usernameInput = {};
    let passwordInput = {};
    function handleRegister(event) {
        event.preventDefault();
        let username = usernameInput.value;
        let password = passwordInput.value;
        return API.register(username, password)
            .then(result => {
                setFormErrors({});
                return onSuccess();
            })
            .catch(err => setFormErrors({ api: err.toString() }));
    }

    let alertForApiError = '';
    if (formErrors.api) {
        alertForApiError = (<Alert variant="danger">Invalid username or password.</Alert>);
    }
    return (
        <div>
            {alertForApiError}
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

export default RegisterPage;