import React from 'react';
import {Form, Button} from 'react-bootstrap';
import styled from 'styled-components';

const LoginLink = styled.a `
    display: inline-block;
    padding: .375rem 0;
`;

function RegisterForm() {
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
                    Register
                </Button>
            </Form>
            <LoginLink href="/login">Already had an account? Login here!</LoginLink>
        </div>
    )
}

export default RegisterForm;