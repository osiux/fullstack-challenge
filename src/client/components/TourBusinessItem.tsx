import React, { memo, Fragment, useContext } from 'react';
import tw from 'twin.macro';
import { Draggable } from 'react-beautiful-dnd';

import TourContext from '@client/context/TourContext';
import useBusiness from '@client/hooks/api/useBusiness';
import getRatingImg from '@client/utils/getRatingImg';
import LoaderImg from '@client/images/loader-bars.svg';

const Container = tw.div`w-full block shadow-lg mb-3 py-3 px-2 border relative`;
const Loader = tw.img`block mx-auto h-8`;
const RatingImg = tw.img`w-auto pb-6`;
const RemoveButton = tw.button`mx-auto bg-red-500 w-auto text-white px-2 py-1 cursor-pointer mt-1 absolute right-0 -mt-6 mr-2 rounded hover:bg-red-700`;

type TourBusinessItemProps = {
    businessId: string;
    index: number;
};

const TourBusinessItem = ({ businessId, index }: TourBusinessItemProps) => {
    const [{ id }, dispatch] = useContext(TourContext);
    const { data: business, status } = useBusiness(businessId);

    const onClick = () => {
        dispatch({ type: 'REMOVE', payload: businessId });
    };

    return (
        <Draggable
            draggableId={businessId}
            index={index}
            isDragDisabled={id !== null}
        >
            {(provided) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {status === 'loading' && (
                        <Loader src={LoaderImg} alt="Loading..." />
                    )}
                    {business && status === 'success' && (
                        <Fragment>
                            <h1>{business.name}</h1>
                            <RatingImg
                                src={getRatingImg(business.rating)}
                                alt={`Rated ${business.rating} stars`}
                            />
                            <RemoveButton onClick={onClick}>
                                Remove
                            </RemoveButton>
                        </Fragment>
                    )}
                </Container>
            )}
        </Draggable>
    );
};

export default memo(TourBusinessItem);
