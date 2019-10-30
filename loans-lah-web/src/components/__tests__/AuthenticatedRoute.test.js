import { Router, Switch, Route } from 'react-router-dom';
import {render} from "@testing-library/react";
import { createMemoryHistory } from 'history'
import {UserProvider} from "../../UserContext";
import React from "react";
import AuthenticatedRoute from "../AuthenticatedRoute";
import User, {GUEST_USER} from "../../models/User";

function renderWithRouterAndUser({user = {}, route = "/"}) {
    const history = createMemoryHistory({ initialEntries: [route] });
    return render(
        <Router history={history}>
            <UserProvider value={user}>
                <Switch>
                    <Route path="/login">
                        <span>User is not logged in!</span>
                    </Route>
                    <AuthenticatedRoute path="/authenticated" render={(props)=>(<span>User is logged in!</span>)}>
                    </AuthenticatedRoute>
                </Switch>
            </UserProvider>
        </Router>);
}

describe('when user is not logged in', function () {
    it('redirects to /login', function () {
        const { container } = renderWithRouterAndUser({user: GUEST_USER, route: "/authenticated"});
        expect(container.innerHTML).toMatch('User is not logged in!');
    });
});

describe('when user is logged in', function () {
    it('renders authenticated route\'s components', function () {
        const { container } = renderWithRouterAndUser({user: new User("John Doe", true), route: "/authenticated"});
        expect(container.innerHTML).toMatch('User is logged in!');
    });
});