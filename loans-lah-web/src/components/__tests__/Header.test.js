import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithUserContext } from "../../__tests__/test_utils";
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';
import User, {GUEST_USER} from "../../models/User";

afterEach(cleanup);

describe('when user is not logged in', function () {
    it('renders header with only app label', function () {
        const wrapper = renderWithUserContext(<Header />, { user: GUEST_USER });
        expect(wrapper.queryByText("Apply Now!")).toBeNull();
        expect(wrapper.queryByText("My Applications")).toBeNull();
        expect(wrapper.queryByText("My Loans")).toBeNull();
        expect(wrapper.queryByText("Log Out")).toBeNull();
    });
});

describe('when user is logged in', function () {
    it('renders header with only app label', function () {
        const wrapper = renderWithUserContext(<Header />, { user: new User("John Doe", "some token") });
        expect(wrapper.queryByText("Apply Now!")).toBeVisible();
        expect(wrapper.queryByText("My Applications")).toBeVisible();
        expect(wrapper.queryByText("My Loans")).toBeVisible();
        expect(wrapper.queryByText("Log Out")).toBeVisible();
    });
});