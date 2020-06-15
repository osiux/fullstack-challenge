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

import Rating0 from '@client/images/regular_0.png';
import Rating1 from '@client/images/regular_1.png';
import Rating15 from '@client/images/regular_1_half.png';
import Rating2 from '@client/images/regular_2.png';
import Rating25 from '@client/images/regular_2_half.png';
import Rating3 from '@client/images/regular_3.png';
import Rating35 from '@client/images/regular_3_half.png';
import Rating4 from '@client/images/regular_4.png';
import Rating45 from '@client/images/regular_4_half.png';
import Rating5 from '@client/images/regular_5.png';

import TourContext from '@client/context/TourContext';

const ratingImg = {
    r0: Rating0,
    r1: Rating1,
    'r1.5': Rating15,
    r2: Rating2,
    'r2.5': Rating25,
    r3: Rating3,
    'r3.5': Rating35,
    r4: Rating4,
    'r4.5': Rating45,
    r5: Rating5,
};

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
    ${tw`mx-auto bg-green-500 w-full text-white py-2 cursor-pointer absolute bottom-0`}

    &.added {
        ${tw`bg-red-500`}
    }
`;

type BusinessItemProps = {
    business: Business;
};

const BusinessItem = ({ business }: BusinessItemProps) => {
    const [tour, dispatch] = useContext(TourContext);

    const ratingImgKey = `r${business.rating}`;

    const isAdded = tour.ids.includes(business.id);

    const onClick = () => {
        if (isAdded) {
            dispatch({ type: 'REMOVE', payload: business.id });
        } else {
            dispatch({ type: 'ADD', payload: business.id });
        }
    };

    return (
        <BusinessContainer>
            <Img src={business.image_url} alt={business.name} />
            <NameContainer>
                <Name>{business.name}</Name>
            </NameContainer>
            <ContentContainer>
                <P>
                    <RatingImg
                        src={ratingImg[ratingImgKey]}
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
            <AddButton onClick={onClick} className={isAdded ? 'added' : ''}>
                {isAdded ? 'Remove from' : 'Add to'} Tour
            </AddButton>
        </BusinessContainer>
    );
};

export default memo(BusinessItem);
