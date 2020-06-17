import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@client/components/Layout';
import { UserContextProvider } from '@client/context/UserContext';

import { HOME, SAVED, TOUR } from '@client/constants/routes';

import Home from '@client/pages/Home';
import Saved from '@client/pages/Saved';
import ViewTour from '@client/pages/ViewTour';

const App = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Layout>
                    <Routes>
                        <Route path={HOME}>
                            <Home />
                        </Route>
                        <Route path={SAVED}>
                            <Saved />
                        </Route>
                        <Route path={TOUR}>
                            <ViewTour />
                        </Route>
                    </Routes>
                </Layout>
            </UserContextProvider>
        </BrowserRouter>
    );
};

export default App;
