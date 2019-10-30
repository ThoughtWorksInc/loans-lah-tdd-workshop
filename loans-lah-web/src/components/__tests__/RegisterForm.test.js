import React from "react";
import {render, cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { LocalStorageMock } from '@react-mock/localstorage';
import RegisterForm from "../RegisterForm";
import API from "../../services/api";
import {createMemoryHistory} from "history";
import {Router, Switch, Route} from "react-router-dom";
import {UserProvider} from "../../UserContext";
import User, {GUEST_USER} from "../../models/User";

function renderWithMockLocalStorage({ user }) {
    const history = createMemoryHistory({ initialEntries: ["/register"] });
    return render(
        <Router history={history}>
            <LocalStorageMock>
                <UserProvider value={ user }>
                    <Switch>
                        <Route path="/register">
                            <RegisterForm />
                        </Route>
                        <Route path="/login">
                            <span>User can login now!</span>
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

API.register = jest.fn();
afterEach(cleanup);

describe('when user register with valid username and password', function () {
    it('redirects to /login', function () {
        API.register.mockResolvedValueOnce(true);

        let wrapper = renderWithMockLocalStorage({user: GUEST_USER });
        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Register'));

        return wait(() => wrapper.getByText('User can login now!'))
            .then(() => {
                expect(API.register.mock.calls[0][0]).toEqual("johndoe");
                expect(API.register.mock.calls[0][1]).toEqual("foobar");
            });
    });
});

describe('when user is logged in', function () {
    it('redirects to /', function () {
        let wrapper = renderWithMockLocalStorage({user: new User("johndoe", true) });
        expect(wrapper.container.innerHTML).toMatch('User is logged in!');
    });
});
