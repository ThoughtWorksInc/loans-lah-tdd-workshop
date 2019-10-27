import React from 'react';
import Container from 'react-bootstrap/Container';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import styled from "styled-components";

const MainContainer = styled(Container)`
    margin-top: 1rem;
`;

function App() {
    return (
        <div>
            <Header/>
            <MainContainer>
                <LoginForm/>
            </MainContainer>
        </div>
    );
}

export default App;
