import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from "styled-components";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { UserProvider } from './UserContext'
import {GUEST_USER} from "./models/User";

const MainContainer = styled(Container)`
    margin-top: 1rem;
`;

function App() {
    const user = GUEST_USER;

    return (
        <UserProvider value={user}>
            <Header/>
            <MainContainer>
                <LoginForm/>
            </MainContainer>
        </UserProvider>
    );
}

export default App;
