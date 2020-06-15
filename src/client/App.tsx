import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@client/components/Layout';
import { UserContextProvider } from '@client/context/UserContext';

import { HOME, SAVED } from '@client/constants/routes';

import Home from '@client/pages/Home/Home';

const App = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Layout>
                    <Routes>
                        <Route path={HOME}>
                            <Home />
                        </Route>
                    </Routes>
                </Layout>
            </UserContextProvider>
        </BrowserRouter>
    );
};

export default App;
