import React from "react";
import {cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LoginPage from "../LoginPage";
import API from "../../services/api";
import User, {GUEST_USER} from "../../models/User";
import {renderWithUserContext} from "../../__tests__/test_utils";

API.login = jest.fn();
afterEach(cleanup);

describe('when user logs in with valid username and password', function () {
    it('stores jwt in session storage and calls onSuccess callback', function () {
        const expectedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        API.login.mockResolvedValueOnce(expectedJwt);
        const onLoginSuccess = jest.fn();

        let wrapper = renderWithUserContext(<LoginPage onSuccess={onLoginSuccess} />,
            { user: GUEST_USER });
        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Log In'));

        return wait(() => expect(API.login).toHaveBeenCalled())
            .then(() => {
                expect(API.login.mock.calls[0][0]).toEqual('johndoe');
                expect(API.login.mock.calls[0][1]).toEqual('foobar');
                expect(onLoginSuccess).toHaveBeenCalled();
                expect(onLoginSuccess.mock.calls[0][0]).toEqual({ jwt: expectedJwt, username: "johndoe" });
            });
    });
});

describe('when user is logged in', function () {
    it('calls onUserLoggedIn callback', function () {
        const onUserLoggedIn = jest.fn();

        renderWithUserContext(<LoginPage onUserLoggedIn={onUserLoggedIn} />,
            { user: new User("johndoe", "some token") });

        expect(onUserLoggedIn).toHaveBeenCalled();
    });
});
