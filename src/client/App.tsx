import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from '@client/components/NavBar';
import { UserContextProvider } from '@client/context/UserContext';

import { HOME, SAVED } from '@client/constants/routes';

import Home from '@client/pages/Home';

const Main = tw.main`container mx-auto`;

const App = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Main>
                    <NavBar />
                    <Routes>
                        <Route path={HOME}>
                            <Home />
                        </Route>
                    </Routes>
                </Main>
            </UserContextProvider>
        </BrowserRouter>
    );
};

export default App;
