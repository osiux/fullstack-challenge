import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter } from 'react-router-dom';

import NavBar from '@client/components/NavBar';

const Main = tw.main`container mx-auto`;

const App = () => {
    return (
        <BrowserRouter>
            <Main>
                <NavBar />
                <h1>My App</h1>
                <p>Welcome to my new app!</p>
            </Main>
        </BrowserRouter>
    );
};

export default App;
