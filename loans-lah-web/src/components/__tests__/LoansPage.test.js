import React from "react";
import {cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LoansPage from "../LoansPage";
import API from "../../services/api";
import User from "../../models/User";
import {renderWithUserContext} from "../../test_utils";

API.getAllLoans = jest.fn();
afterEach(cleanup);

describe('when user click Apply with valid form', function () {
    it('submits new loan and call onSuccess callback', function () {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loans = [
            { id: 1, amount: 200, takenAt: '2019-01-01', totalOutstanding: 210, interestRate: 10, durationInDays: 30 },
            { id: 2, amount: 500, takenAt: '2019-02-01', totalOutstanding: 510, interestRate: 10, durationInDays: 60 }
        ];
        API.getAllLoans.mockResolvedValueOnce(loans);

        let wrapper = renderWithUserContext(<LoansPage />, { user: new User("johndoe", jwt) });

        return wait(() => expect(API.getAllLoans).toHaveBeenCalled())
            .then(() => {
                expect(API.getAllLoans.mock.calls[0][0]).toEqual({ jwt });
                expect(wrapper.queryByText("1")).toBeVisible();
                expect(wrapper.queryByText("200")).toBeVisible();
                expect(wrapper.queryByText("2019-01-01")).toBeVisible();
                expect(wrapper.queryByText("2")).toBeVisible();
                expect(wrapper.queryByText("500")).toBeVisible();
                expect(wrapper.queryByText("2019-02-01")).toBeVisible();
            });
    });
});
