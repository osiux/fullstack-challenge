import React, {
    Fragment,
    memo,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import TourBusinessItem from '@client/components/TourBusinessItem';

import TourContext from '@client/context/TourContext';
import useDebounce from '@client/hooks/useDebounce';

const Container = tw.aside`col-span-3 md:col-span-1 min-h-full p-3`;
const ItemsContainer = tw.div`sticky top-0 self-start`;
const Instructions = tw.p`mb-3 text-center`;
const NameInput = tw.input`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`;
const ButtonsContainer = tw.div`flex justify-between`;
const BaseButton = css`
    ${tw`cursor-pointer inline-block w-2/5 tracking-wider text-white leading-loose font-bold py-2 mb-3 rounded inline-block`};
`;

const SaveButton = styled.button`
    ${BaseButton}
    ${tw`bg-blue-700 mr-2`}
`;

const ResetButton = styled.button`
    ${BaseButton}
    ${tw`bg-gray-700`}
`;

const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const TourBuilder = () => {
    const [{ name, ids }, dispatch] = useContext(TourContext);
    const [idsToRender, setIdsToRender] = useState(ids);
    const [debouncedTourName, tourName, setTourName] = useDebounce(name, 300);

    useEffect(() => {
        setIdsToRender(ids);
    }, [ids]);

    useEffect(() => {
        dispatch({ type: 'SET_NAME', payload: debouncedTourName });
    }, [debouncedTourName, dispatch]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) {
                return;
            }

            if (result.destination.index === result.source.index) {
                return;
            }

            const newIds = reorder(
                ids,
                result.source.index,
                result.destination.index
            );

            setIdsToRender(newIds);
            dispatch({ type: 'SET_REORDERED_IDS', payload: newIds });
        },
        [dispatch, ids]
    );

    const onReset = useCallback(() => {
        const areYouSure = confirm(
            'This will remove selected places and name. You have to start over.'
        );

        if (areYouSure) dispatch({ type: 'RESET' });
    }, [dispatch]);

    return (
        <Container>
            <ItemsContainer>
                <Instructions>
                    Search and select places to add to your tour.
                    <br />
                    Once you are done, you can optionally name
                    <br /> it and save it.
                </Instructions>
                <hr />
                {idsToRender.length > 0 && (
                    <Fragment>
                        <NameInput
                            type="text"
                            name="tourname"
                            id="tourname"
                            placeholder="Name of your Tour (optional)"
                            onChange={(e) => setTourName(e.target.value)}
                            value={tourName}
                        />
                        <ButtonsContainer>
                            <SaveButton>Save</SaveButton>
                            <ResetButton onClick={onReset}>Reset</ResetButton>
                        </ButtonsContainer>
                    </Fragment>
                )}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {idsToRender.map((id, index) => (
                                    <TourBusinessItem
                                        key={id}
                                        index={index}
                                        businessId={id}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ItemsContainer>
        </Container>
    );
};

export default memo(TourBuilder);
