import React from "react";
import {cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from "../RegisterPage";
import API from "../../services/api";
import User, {GUEST_USER} from "../../models/User";
import {renderWithUserContext} from "../../__tests__/test_utils";
API.register = jest.fn();
afterEach(cleanup);

describe('when user click Register with valid username and password', function () {
    it('registers user and calls onSuccess callback', function () {
        API.register.mockResolvedValueOnce(true);
        const onRegisterSuccess = jest.fn();

        let wrapper = renderWithUserContext(<RegisterPage onSuccess={onRegisterSuccess} />,
            { user: GUEST_USER });
        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Register'));

        return wait(() => expect(API.register).toHaveBeenCalled())
            .then(() => {
                expect(API.register.mock.calls[0][0]).toEqual('johndoe');
                expect(API.register.mock.calls[0][1]).toEqual('foobar');
                expect(onRegisterSuccess).toHaveBeenCalled();
            });
    });
});

describe('when user is logged in', function () {
    it('calls onUserLoggedIn callback', function () {
        const onUserLoggedIn = jest.fn();

        renderWithUserContext(<RegisterPage onUserLoggedIn={onUserLoggedIn} />,
            { user: new User("johndoe", "some token") });

        expect(onUserLoggedIn).toHaveBeenCalled();
    });
});
