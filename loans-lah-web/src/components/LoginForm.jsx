import React from 'react';
import {Form, Button} from 'react-bootstrap';
import styled from 'styled-components';

const RegisterLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function LoginForm() {
    return (
        <div>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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