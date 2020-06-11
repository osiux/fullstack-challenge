import React from 'react';
import tw from 'twin.macro';

const Main = tw.main`w-1/2 text-center my-0 mx-auto text-xl`;

const App = () => {
    return (
        <Main>
            <h1>My App</h1>
            <p>Welcome to my new app!</p>
        </Main>
    );
};

export default App;
