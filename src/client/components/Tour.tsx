import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Tour as TourType } from '@server/types';

import TourActions from '@client/components/TourActions';
import BusinessItem from '@client/components/BusinessItem';

const TourContainer = tw.div`my-3`;
const TourHeading = styled(Link)`
    ${tw`bg-gray-700 flex justify-between p-4 text-white rounded items-center`}
`;
const PlacesContainer = tw.section`grid grid-flow-row grid-cols-3 gap-2`;

type TourProps = {
    tour: TourType;
};

const Tour = ({ tour }: TourProps) => {
    const tourDate = tour.createdAt || '';

    return (
        <TourContainer>
            <TourHeading to={`/tour/${tour.id}`} title="View Tour">
                <span>
                    <strong>Name:</strong> {tour.name || 'N/A'}
                </span>
                <span>
                    <strong>Created at:</strong> {tourDate}
                </span>
                <TourActions tourId={tour.id} />
            </TourHeading>
            <PlacesContainer>
                {tour.places.map((place) => (
                    <BusinessItem
                        key={place.id}
                        business={place}
                        hideAddButton
                    />
                ))}
            </PlacesContainer>
        </TourContainer>
    );
};

export default Tour;
