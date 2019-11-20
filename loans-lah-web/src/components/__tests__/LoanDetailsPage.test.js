import React from "react";
import {cleanup, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LoanDetailsPage from "../LoanDetailsPage";
import API from "../../services/api";
import User from "../../models/User";
import {renderWithUserContext} from "../../test_utils";

API.getLoanById = jest.fn();
afterEach(cleanup);

describe('when user access the details of a valid loan', function () {
    it('fetches and displays the loan details', function () {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loan = { id: 1, amount: 200, takenAt: '2019-01-01', totalOutstanding: 210, interestRate: 10, durationInDays: 30 };
        API.getLoanById.mockResolvedValueOnce(loan);

        let wrapper = renderWithUserContext(<LoanDetailsPage loanId="1" />, { user: new User("johndoe", jwt) });

        return wait(() => expect(API.getLoanById).toHaveBeenCalled())
            .then(() => {
                expect(API.getLoanById.mock.calls[0][0]).toEqual({ jwt, id: `${loan.id}` });
                expect(wrapper.queryByText("1")).toBeVisible();
                expect(wrapper.queryByText("200")).toBeVisible();
                expect(wrapper.queryByText("2019-01-01")).toBeVisible();
                expect(wrapper.queryByText("210")).toBeVisible();
                expect(wrapper.queryByText("10%")).toBeVisible();
                expect(wrapper.queryByText("30 day(s)")).toBeVisible();
            });
    });
});

describe('when user access the details of an invalid loan', function () {
    it('shows loan not found', function () {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        API.getLoanById.mockRejectedValueOnce(new Error("404 Not Found"));

        let wrapper = renderWithUserContext(<LoanDetailsPage loanId="1" />, { user: new User("johndoe", jwt) });

        return wait(() => expect(API.getLoanById).toHaveBeenCalled())
            .then(() => {
                expect(API.getLoanById.mock.calls[0][0]).toEqual({ jwt, id: "1" });
                expect(wrapper.queryByText("Server error: Error: 404 Not Found")).toBeVisible();
                expect(wrapper.queryByText("ID")).toBeNull();
            });
    });
});
