import React from 'react';
import { render as rtlRender, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';
import {UserProvider} from "../../UserContext";
import User, {GUEST_USER} from "../../models/User";

function render(ui, {user = {}, ...options} = {}) {
    function Wrapper(props) {
        return <UserProvider value={user} {...props} />
    }
    return rtlRender(ui, {wrapper: Wrapper, ...options})
}

afterEach(cleanup);

describe('when user is not logged in', function () {
    it('renders header with only app label', function () {
        const wrapper = render(<Header />, { user: GUEST_USER });
        expect(wrapper.queryByText("Apply Now!")).toBeNull();
        expect(wrapper.queryByText("My Applications")).toBeNull();
        expect(wrapper.queryByText("My Loans")).toBeNull();
        expect(wrapper.queryByText("Log Out")).toBeNull();
    });
});

describe('when user is logged in', function () {
    it('renders header with only app label', function () {
        const wrapper = render(<Header />, { user: new User("John Doe", true) });
        expect(wrapper.queryByText("Apply Now!")).toBeVisible();
        expect(wrapper.queryByText("My Applications")).toBeVisible();
        expect(wrapper.queryByText("My Loans")).toBeVisible();
        expect(wrapper.queryByText("Log Out")).toBeVisible();
    });
});