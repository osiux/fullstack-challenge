import React, { memo } from 'react';
import tw from 'twin.macro';

import useToursByUser from '@client/hooks/api/useToursByUser';
import LoadingImg from '@client/images/loader.svg';
import Tour from '@client/components/Tour';

const Container = tw.section`col-span-3`;
const Loader = tw.img`mx-auto mt-3`;

const Saved = () => {
    const { data, status } = useToursByUser();

    return (
        <Container>
            {status === 'loading' && <Loader src={LoadingImg} alt="Loading" />}
            {data &&
                status === 'success' &&
                data.map((tour) => <Tour key={tour.id} tour={tour} />)}
        </Container>
    );
};

export default memo(Saved);
