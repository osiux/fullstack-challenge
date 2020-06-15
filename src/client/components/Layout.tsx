import React from 'react';
import tw from 'twin.macro';

import NavBar from '@client/components/NavBar';

const Main = tw.main`container mx-auto h-screen grid grid-rows-layout grid-cols-2`;

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
    <Main>
        <NavBar />
        {children}
    </Main>
);

export default Layout;
