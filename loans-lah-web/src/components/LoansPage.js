import React, {useContext, useState, useEffect} from 'react';
import UserContext from "../UserContext";
import {Table} from "react-bootstrap";
import API from "../services/api";

function LoansPage() {
    const user = useContext(UserContext);
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        API.getAllLoans({ jwt: user.jwt })
            .then(loans => setLoans(loans));
    }, []);

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>Taken on</th>
                </tr>
                </thead>
                <tbody>
                {loans.map(loan => {
                    return (<tr key={loan.id}>
                        <td><a href={`/loans/${loan.id}`}>{loan.id}</a></td>
                        <td>{loan.amount}</td>
                        <td>{loan.takenAt}</td>
                    </tr>);
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default LoansPage;