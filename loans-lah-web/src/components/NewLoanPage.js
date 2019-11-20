import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from "../services/api";
import UserContext from "../UserContext";
import {Alert} from "react-bootstrap";

function NewLoanPage({ onSuccess }) {
    const user = useContext(UserContext);
    const [formErrors, setFormErrors] = useState({});

    let amounInput = {};
    let durationInput = {};
    function validateForm() {
        let errors = {};
        if (!amounInput.value) {
            errors.amount = "Amount cannot be empty.";
        }

        return errors;
    }

    function handleApplyLoan(event) {
        event.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return '';
        }

        let amount = parseFloat(amounInput.value);
        let duration = parseInt(durationInput.value);
        return API.applyNewLoan({ jwt: user.jwt, loan: { amount, duration } })
            .then(result => {
                setFormErrors({});
                return onSuccess();
            })
            .catch(err => setFormErrors({ api: err.toString() }));
    }

    let alertForApiError = '';
    if (formErrors.api) {
        alertForApiError = (<Alert variant="danger">Server error: {formErrors.api}</Alert>);
    }
    return (
        <div>
            {alertForApiError}
            <Form onSubmit={handleApplyLoan}>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" step="0.01" isInvalid={!!formErrors.amount} placeholder="Amount" ref={(input) => { amounInput = input; }}/>
                    <Form.Control.Feedback type="invalid">
                        {formErrors.amount}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDuration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control as="select" placeholder="Duration" ref={(input) => { durationInput = input; }}>
                        <option value="1">1 month</option>
                        <option value="2">2 months</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Apply
                </Button>
            </Form>
        </div>
    )
}

export default NewLoanPage;