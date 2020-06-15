import React, { useContext } from 'react';
import tw from 'twin.macro';

import TourContext from '@client/context/TourContext';

const Container = tw.aside`col-span-3 md:col-span-1 min-h-full p-3`;

const TourBuilder = () => {
    const [tour] = useContext(TourContext);

    console.log(tour);

    return (
        <Container>
            <p>Search and select places to add to your tour.</p>
        </Container>
    );
};

export default TourBuilder;
