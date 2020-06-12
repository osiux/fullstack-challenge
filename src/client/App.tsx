import React from 'react';
import tw from 'twin.macro';
import ky from 'ky';

const Main = tw.main`w-1/2 text-center my-0 mx-auto text-xl`;

const App = () => {
    const fetchData = async () => {
        const response = await ky.get('/api').json();

        console.log(response);
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
