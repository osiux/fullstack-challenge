import React, { useState } from 'react';
import tw from 'twin.macro';

import { TourContextProvider } from '@client/context/TourContext';
import useSearchResults from '@client/hooks/api/useSearchResults';

import SearchForm, { FormData } from './SearchForm';
import DisplayResults from './DisplayResults';
import TourBuilder from './TourBuilder';

import LoadingImg from '@client/images/loader.svg';

const SearchSection = tw.section`col-span-3 md:col-span-2`;

const Loader = tw.img`mx-auto mt-3`;

const Home = () => {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState<undefined | string>('');

    const { data, status } = useSearchResults(term, location, radius);

    const doSearch = ({ term, location, radius }: FormData) => {
        setTerm(term);
        setLocation(location);
        setRadius(radius);
    };

    const resetForm = () => {
        setTerm('');
        setLocation('');
        setRadius('');
    };

    return (
        <TourContextProvider>
            <SearchSection>
                <SearchForm onSubmit={doSearch} onReset={resetForm} />
                {status === 'success' && data && (
                    <DisplayResults businesses={data} />
                )}
                {status === 'loading' && (
                    <Loader src={LoadingImg} alt="Loading" />
                )}
            </SearchSection>
            <TourBuilder />
        </TourContextProvider>
    );
};

export default Home;
