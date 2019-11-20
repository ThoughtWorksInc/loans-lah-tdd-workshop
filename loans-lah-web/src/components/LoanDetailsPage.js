import React, {useContext, useState, useEffect} from 'react';
import UserContext from "../UserContext";
import {Alert, Table} from "react-bootstrap";
import API from "../services/api";

/**
 * @return {null}
 */
function LoanDetailsPage({ loanId }) {
    const user = useContext(UserContext);
    const [loan, setLoan] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        API.getLoanById({ jwt: user.jwt, id: loanId })
            .then(loan => setLoan(loan))
            .catch(err => setError(err.toString()));
    }, []);

    if (error) {
        return (<Alert variant="danger">Server error: {error}</Alert>);
    } else if (loan.id) {
        return (
            <div>
                <dl className="row">
                    <dt className="col-sm-3">ID</dt>
                    <dd className="col-sm-9">{loan.id}</dd>

                    <dt className="col-sm-3">Taken on</dt>
                    <dd className="col-sm-9">{loan.takenAt}</dd>

                    <dt className="col-sm-3">Amount</dt>
                    <dd className="col-sm-9">{loan.amount}</dd>

                    <dt className="col-sm-3">Duration</dt>
                    <dd className="col-sm-9">{Math.ceil(loan.durationInDays / 30)} month(s)</dd>

                    <dt className="col-sm-3">Interest rate</dt>
                    <dd className="col-sm-9">{loan.interestRate}%</dd>

                    <dt className="col-sm-3">Outstanding amount</dt>
                    <dd className="col-sm-9">{loan.totalOutstanding}</dd>
                </dl>
            </div>
        );
    }
    return null;
}

export default LoanDetailsPage;