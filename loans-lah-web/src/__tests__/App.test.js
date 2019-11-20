import React from 'react';
import {cleanup, fireEvent, render, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import API from "../services/api";
import App from "../App";
import {createMemoryHistory} from "history";
import {waitForElement} from "@testing-library/dom";

API.register = jest.fn();
API.login = jest.fn();
API.getAllLoans = jest.fn();
API.applyNewLoan = jest.fn();
API.getLoanById = jest.fn();

afterEach(function () {
    cleanup();
    sessionStorage.clear();
    API.register.mockReset();
    API.login.mockReset();
    API.getAllLoans.mockReset();
    API.getLoanById.mockReset();
    API.applyNewLoan.mockReset();
});

function renderApp({ jwt, loggedInUser, history }) {
    if (jwt) {
        sessionStorage.setItem("jwt", jwt);
        sessionStorage.setItem("loggedInUser", loggedInUser);
    }

    return render(<App history={history} />);
}

describe('when user registers', function () {
    it('redirect user to login', function () {
        const history = createMemoryHistory();

        const wrapper = renderApp({ jwt: null, loggedInUser: null, history });
        expect(wrapper.queryByText('Log In')).toBeVisible();

        history.push('/register');
        API.register.mockResolvedValueOnce(true);
        expect(wrapper.queryByText('Register')).toBeVisible();

        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Register'));

        return wait(() => expect(API.register).toHaveBeenCalled())
            .then(() => {
                expect(history.location.pathname).toEqual("/login");
                expect(wrapper.queryByText('Log In')).toBeVisible();
            });
    });
});

describe('when user logs in', function () {
    it('redirect user to loans', function () {
        const history = createMemoryHistory();
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loggedInUser = 'johndoe';
        const loans = [
            { id: 1, amount: 200, takenAt: '2019-01-01', totalOutstanding: 210, interestRate: 10, durationInDays: 30 }
        ];

        const wrapper = renderApp({ jwt: null, loggedInUser: null, history });
        API.login.mockResolvedValueOnce(jwt);
        API.getAllLoans.mockResolvedValueOnce(loans);
        expect(wrapper.queryByText('Log In')).toBeVisible();

        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: loggedInUser } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Log In'));

        return wait(() => expect(API.login).toHaveBeenCalled())
            .then(() => {
                expect(history.location.pathname).toEqual("/loans");
                return wait(() => expect(API.getAllLoans).toHaveBeenCalled())
            })
            .then(() => {
                expect(wrapper.queryByText('2019-01-01')).toBeVisible();
            });
    });
});

describe('when user applies new loan', function () {
    it('redirect user to loans', function () {
        const history = createMemoryHistory();
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loggedInUser = 'johndoe';
        const loans = [
            { id: 1, amount: 200, takenAt: '2019-01-01', totalOutstanding: 210, interestRate: 10, durationInDays: 30 }
        ];

        API.getAllLoans.mockResolvedValueOnce([]);
        const wrapper = renderApp({ jwt, loggedInUser, history });
        expect(history.location.pathname).toEqual("/loans");

        return wait(() => expect(API.getAllLoans).toHaveBeenCalled())
            .then(() => {
                history.push("/loans/new");
                API.applyNewLoan.mockResolvedValueOnce(true)
                API.getAllLoans.mockResolvedValueOnce(loans);
                expect(wrapper.queryByText('Apply')).toBeVisible();

                fireEvent.change(wrapper.getByLabelText('Amount'), { target: { value: '200' } });
                fireEvent.change(wrapper.getByLabelText('Duration'), { target: { value: '3' } });
                fireEvent.click(wrapper.getByText('Apply'));

                return wait(() => expect(API.applyNewLoan).toHaveBeenCalled());
            }).then(() => {
                expect(history.location.pathname).toEqual("/loans");
            });
    });
});

describe('when user views details of a loan', function () {
    it('redirect user to loans', function () {
        const history = createMemoryHistory();
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loggedInUser = 'johndoe';
        const loans = [
            { id: 1, amount: 200, takenAt: '2019-01-01', totalOutstanding: 210, interestRate: 10, durationInDays: 30 }
        ];

        API.getAllLoans.mockResolvedValueOnce(loans);
        API.getLoanById.mockResolvedValueOnce(loans[0]);
        const wrapper = renderApp({ jwt, loggedInUser, history });
        expect(history.location.pathname).toEqual("/loans");

        return waitForElement(() => wrapper.getByText('2019-01-01'))
            .then(() => {
                history.push("/loans/1");
                return wait(() => expect(API.getLoanById).toHaveBeenCalled());
            }).then(() => {
                expect(wrapper.queryByText('1 month(s)')).toBeVisible();
            });
    });
});

describe('when user logs out', function () {
    it('redirect user to login', function () {
        const history = createMemoryHistory();
        const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        const loggedInUser = 'johndoe';

        API.getAllLoans.mockResolvedValueOnce([]);
        const wrapper = renderApp({ jwt, loggedInUser, history });
        expect(history.location.pathname).toEqual("/loans");

        return wait(() => expect(API.getAllLoans).toHaveBeenCalled())
            .then(() => {
                history.push("/logout");

                expect(wrapper.queryByText('Log In')).toBeVisible();
                expect(history.location.pathname).toEqual("/login");
            });
    });
});