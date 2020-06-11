import React from 'react';
import tw from 'twin.macro';

const Main = tw.main`w-1/2 text-center my-0 mx-auto text-xl`;

const App = () => {
    const fetchData = async () => {
        const response = await fetch('/api');
        const jsonResponse = await response.json();

        console.log(jsonResponse);
    };

    return (
        <Main>
            <h1>My App</h1>
            <p>Welcome to my new app!</p>
            <button onClick={() => fetchData()}>Test</button>
        </Main>
    );
};

export default App;
