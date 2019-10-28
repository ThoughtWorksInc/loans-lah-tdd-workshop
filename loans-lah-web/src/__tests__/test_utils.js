import React from "react";
import {render} from "@testing-library/react";
import {UserProvider} from "../UserContext";

export function renderWithUserContext(ui, {user = {}, ...options} = {}) {
    function Wrapper(props) {
        return <UserProvider value={user} {...props} />
    }

    return render(ui, {wrapper: Wrapper, ...options})
}