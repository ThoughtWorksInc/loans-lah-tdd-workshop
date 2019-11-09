import React from "react";
import {render, cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { LocalStorageMock } from '@react-mock/localstorage';
import LoginPage from "../LoginPage";
import API from "../../services/api";
import {createMemoryHistory} from "history";
import {Router, Switch, Route} from "react-router-dom";
import {UserProvider} from "../../UserContext";
import User, {GUEST_USER} from "../../models/User";

function renderWithMockLocalStorage({ user, onLoginSuccess }) {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    return render(
        <Router history={history}>
            <LocalStorageMock>
                <UserProvider value={ user }>
                    <Switch>
                        <Route path="/login">
                            <LoginPage onSuccess={(data) => { onLoginSuccess(data); history.push("/"); }} />
                        </Route>
                        <Route path="/">
                            <span>User is logged in!</span>
                        </Route>
                    </Switch>
                </UserProvider>
            </LocalStorageMock>
        </Router>
    );
}

API.login = jest.fn();
afterEach(cleanup);

describe('when user logs in with valid username and password', function () {
    it('stores jwt in session storage and calls onSuccess callback', function () {
        const expectedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        API.login.mockResolvedValueOnce(expectedJwt);
        const onLoginSuccess = jest.fn();

        let wrapper = renderWithMockLocalStorage({ user: GUEST_USER, onLoginSuccess });
        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Log In'));

        return wait(() => wrapper.getByText('User is logged in!'))
            .then(() => {
                expect(onLoginSuccess).toHaveBeenCalled();
                expect(onLoginSuccess.mock.calls[0][0]).toEqual({ jwt: expectedJwt, username: "johndoe" });
            });
    });
});

describe('when user is logged in', function () {
    it('redirects to /', function () {
        let wrapper = renderWithMockLocalStorage({user: new User("johndoe", "some token") });
        expect(wrapper.container.innerHTML).toMatch('User is logged in!');
    });
});
