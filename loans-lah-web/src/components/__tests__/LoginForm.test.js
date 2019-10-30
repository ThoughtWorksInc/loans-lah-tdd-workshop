import React from "react";
import {render, cleanup, fireEvent, wait} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { LocalStorageMock } from '@react-mock/localstorage';
import LoginForm from "../LoginForm";
import API from "../../services/api";
import {createMemoryHistory} from "history";
import {Router, Switch, Route} from "react-router-dom";

function renderWithMockLocalStorage() {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    return render(
        <Router history={history}>
            <LocalStorageMock>
                <Switch>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/">
                        <span>User is logged in!</span>
                    </Route>
                </Switch>
            </LocalStorageMock>
        </Router>
    );
}

API.login = jest.fn();
afterEach(cleanup);

describe('when user logs in with valid username and password', function () {
    it('stores jwt in session storage and redirects to /', function () {
        const expectedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        API.login.mockResolvedValueOnce(expectedJwt);

        let wrapper = renderWithMockLocalStorage();
        fireEvent.change(wrapper.getByLabelText("Username"), { target: { value: 'johndoe' } });
        fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: 'foobar' } });
        fireEvent.click(wrapper.getByText('Log In'));

        return wait(() => expect(sessionStorage.getItem("jwt")).toEqual(expectedJwt))
            .then(() => expect(wrapper.container.innerHTML).toMatch('User is logged in!'));
    });
});
