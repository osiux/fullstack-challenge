import React from 'react';
import tw from 'twin.macro';
import { useParams } from 'react-router-dom';

import useTour from '@client/hooks/api/useTour';
import LoadingImg from '@client/images/loader.svg';
import Tour from '@client/components/Tour';

const Container = tw.section`col-span-3`;
const Loader = tw.img`mx-auto mt-3`;

const ViewTour = () => {
    const { tourId } = useParams();

    const { data, status } = useTour(tourId);

    return (
        <Container>
            {status === 'loading' && <Loader src={LoadingImg} alt="Loading" />}
            {data && status === 'success' && <Tour tour={data} />}
        </Container>
    );
};

export default ViewTour;
