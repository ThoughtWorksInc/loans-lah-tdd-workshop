import React from 'react';
import Container from 'react-bootstrap/Container';
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header/>
            <Container>
                <LoginForm/>
            </Container>
        </div>
    );
}

export default App;
