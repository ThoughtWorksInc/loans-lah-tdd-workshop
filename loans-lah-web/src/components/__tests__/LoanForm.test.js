import React from "react";
import {cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LoanForm from "../LoanForm";
import API from "../../services/api";
import User from "../../models/User";
import {renderWithUserContext} from "../../__tests__/test_utils";

API.applyNewLoan = jest.fn();
afterEach(cleanup);

describe('when user click Apply with valid form', function () {
    it('submits new loan and call onSuccess callback', function () {
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const onApplySuccess = jest.fn();
        API.applyNewLoan.mockResolvedValueOnce({ id: 1 });

        let wrapper = renderWithUserContext(<LoanForm onSuccess={onApplySuccess} />, { user: new User("johndoe", jwt) });
        fireEvent.change(wrapper.getByLabelText('Amount'), { target: { value: '100' } });
        fireEvent.change(wrapper.getByLabelText('Duration'), { target: { value: '3' } });
        fireEvent.click(wrapper.getByText('Apply'));

        return wait(() => expect(API.applyNewLoan).toHaveBeenCalled())
            .then(() => {
                expect(API.applyNewLoan.mock.calls[0][0]).toEqual({
                    jwt,
                    loan: {
                        amount: 100,
                        duration: 3
                    }
                });
                expect(onApplySuccess).toHaveBeenCalled();
                expect(onApplySuccess.mock.calls[0][0]).toEqual({ loanId: 1 });
            });
    });
});
