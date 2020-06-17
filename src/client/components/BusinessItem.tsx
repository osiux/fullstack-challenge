import React, { memo, useContext } from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faBuilding,
    faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

import { Business } from '@server/types';

import TourContext from '@client/context/TourContext';

import getRatingImg from '@client/utils/getRatingImg';

const BusinessContainer = tw.div`bg-white shadow-lg rounded-lg overflow-hidden my-4 col-span-3 md:col-span-1 relative`;
const Img = tw.img`w-full h-56 object-cover object-center`;
const NameContainer = tw.div`flex items-center px-6 py-3 bg-gray-900 w-full`;
const Name = tw.h1`mx-1 text-white font-semibold text-sm`;
const ContentContainer = tw.div`py-4 px-6 mb-6`;
const RatingImg = tw.img`inline-block mr-2`;
const P = tw.p`py-2 text-gray-700`;
const Icon = styled(FontAwesomeIcon)`
    ${tw`mr-2`}
`;
const AddButton = styled.button`
    ${tw`mx-auto bg-green-500 w-full text-white py-2 cursor-pointer absolute bottom-0 hover:bg-green-700`}

    &.added {
        ${tw`bg-red-500 hover:bg-red-700`}
    }
`;

type BusinessItemProps = {
    business: Business;
    hideAddButton?: boolean;
};

const BusinessItem = ({
    business,
    hideAddButton = false,
}: BusinessItemProps) => {
    const [tour, dispatch] = useContext(TourContext);

    const ratingImg = getRatingImg(business.rating);

    const isAdded = tour.places.includes(business.id);

    const onClick = () => {
        if (isAdded) {
            dispatch({ type: 'REMOVE', payload: business.id });
        } else {
            dispatch({ type: 'ADD', payload: business.id });
        }
    };

    return (
        <BusinessContainer>
            <a
                href={business.url}
                target="_blank"
                rel="noreferrer"
                title={`Go to Yelp page for ${business.name}`}
            >
                <Img src={business.image_url} alt={business.name} />
                <NameContainer>
                    <Name>{business.name}</Name>
                </NameContainer>
            </a>
            <ContentContainer>
                <P>
                    <RatingImg
                        src={ratingImg}
                        alt={`Rated ${business.rating} stars`}
                    />
                    based on {business.review_count} reviews
                </P>
                <P>
                    <Icon icon={faBuilding} fixedWidth />
                    {business.location.display_address.join(', ')}
                </P>
                {business.display_phone && (
                    <P>
                        <Icon icon={faPhone} fixedWidth />
                        {business.display_phone}
                    </P>
                )}
                {business.price && (
                    <P>
                        <Icon icon={faMoneyBill} fixedWidth />
                        {business.price}
                    </P>
                )}
            </ContentContainer>
            {!hideAddButton && (
                <AddButton onClick={onClick} className={isAdded ? 'added' : ''}>
                    {isAdded ? 'Remove from' : 'Add to'} Tour
                </AddButton>
            )}
        </BusinessContainer>
    );
};

export default memo(BusinessItem);
