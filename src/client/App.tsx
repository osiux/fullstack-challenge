import React from 'react';
import tw from 'twin.macro';
import { Routes, Route } from 'react-router-dom';

import NavBar from '@client/components/NavBar';

const Main = tw.main`container mx-auto`;

const App = () => {
    return (
        <Main>
            <NavBar />
            <h1>My App</h1>
            <p>Welcome to my new app!</p>
        </Main>
    );
};

export default App;
