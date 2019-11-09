import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from "../services/api";
import UserContext from "../UserContext";

function LoanForm({ onSuccess }) {
    const user = useContext(UserContext);

    let amounInput = "";
    let durationInput = "";
    function handleApplyLoan(event) {
        event.preventDefault();
        let amount = parseFloat(amounInput.value);
        let duration = parseInt(durationInput.value);

        return API.applyNewLoan({ jwt: user.jwt, loan: { amount, duration } })
            .then(({ id }) => onSuccess({ loanId: id }));
    }

    return (
        <Form onSubmit={handleApplyLoan}>
            <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Amount" ref={(input) => { amounInput = input; }}/>
            </Form.Group>

            <Form.Group controlId="formDuration">
                <Form.Label>Duration</Form.Label>
                <Form.Control as="select" placeholder="Duration" ref={(input) => { durationInput = input; }}>
                    <option value="1">1 month</option>
                    <option value="2">2 months</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Apply
            </Button>
        </Form>
    )
}

export default LoanForm;