import React, {
    Fragment,
    memo,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useClipboard } from 'use-clipboard-copy';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCode,
    faFileCsv,
    faFilePdf,
    faClipboard,
} from '@fortawesome/free-solid-svg-icons';

import { PostTour } from '@server/types';
import useSaveTour from '@client/hooks/api/useSaveTour';

import TourContext from '@client/context/TourContext';
import UserContext from '@client//context/UserContext';
import useDebounce from '@client/hooks/useDebounce';

import TourBusinessItem from '@client/components/TourBusinessItem';

const Container = tw.aside`col-span-3 md:col-span-1 min-h-full p-3`;
const ItemsContainer = tw.div`sticky top-0 self-start`;
const Instructions = tw.p`mb-3 text-center`;
const NameInput = tw.input`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`;
const ButtonsContainer = tw.div`flex justify-between`;
const TourOptionsContainer = tw.div`flex justify-start mb-3 items-center`;
const LinkInput = tw.input`appearance-none block w-auto bg-gray-100 text-gray-700 border rounded py-3 px-2 ml-1 leading-tight focus:outline-none focus:bg-white`;
const BaseButton = css`
    ${tw`cursor-pointer inline-block w-2/5 tracking-wider text-white leading-loose font-bold py-2 mb-3 rounded inline-block`};

    &[disabled] {
        ${tw`bg-gray-300 text-gray-500 cursor-not-allowed`}
    }
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
    const [{ id: tourId, name, places }, dispatch] = useContext(TourContext);
    const userId = useContext(UserContext);
    const [idsToRender, setIdsToRender] = useState(places);
    const [debouncedTourName, tourName, setTourName] = useDebounce(name, 300);
    const [doSaveTour, { status }] = useSaveTour();
    const clipboard = useClipboard();

    useEffect(() => {
        setIdsToRender(places);
    }, [places]);

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
                places,
                result.source.index,
                result.destination.index
            );

            setIdsToRender(newIds);
            dispatch({ type: 'SET_REORDERED_PLACES', payload: newIds });
        },
        [dispatch, places]
    );

    const onSave = () => {
        const data: PostTour = {
            user: userId,
            name,
            places: idsToRender,
        };

        doSaveTour(data);
    };

    const onReset = useCallback(() => {
        const areYouSure = confirm(
            'This will remove selected places and name. You have to start over.'
        );

        if (areYouSure) dispatch({ type: 'RESET' });
    }, [dispatch]);

    const saveDisabled = status === 'loading' || tourId !== null;
    const tourUrl = `${window.location.protocol}://${window.location.host}/tour/${tourId}`;

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
                            <SaveButton
                                onClick={onSave}
                                disabled={saveDisabled}
                            >
                                {status === 'loading'
                                    ? 'Saving...'
                                    : tourId === null
                                    ? 'Save'
                                    : 'Saved'}
                            </SaveButton>
                            <ResetButton
                                onClick={onReset}
                                disabled={status === 'loading'}
                            >
                                Reset
                            </ResetButton>
                        </ButtonsContainer>
                        {tourId !== null && (
                            <Fragment>
                                <TourOptionsContainer>
                                    <strong>Download Tour as: </strong>
                                    <a
                                        href={`/api/tours/${tourId}/download?format=pdf`}
                                        title="Download as PDF"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFilePdf}
                                            size="2x"
                                            fixedWidth
                                        />
                                    </a>
                                    <a
                                        href={`/api/tours/${tourId}/download?format=csv`}
                                        title="Download as CSV"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFileCsv}
                                            size="2x"
                                            fixedWidth
                                        />
                                    </a>
                                    <a
                                        href={`/api/tours/${tourId}/download?format=json`}
                                        title="Download as JSON"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFileCode}
                                            size="2x"
                                            fixedWidth
                                        />
                                    </a>
                                </TourOptionsContainer>
                                <TourOptionsContainer>
                                    <strong>Link:</strong>
                                    <LinkInput
                                        ref={clipboard.target}
                                        type="text"
                                        value={tourUrl}
                                        readOnly
                                    />
                                    <a
                                        title="Copy to Clipboard"
                                        href={tourUrl}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            clipboard.copy();
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            size="2x"
                                            icon={faClipboard}
                                            fixedWidth
                                        />
                                    </a>
                                </TourOptionsContainer>
                            </Fragment>
                        )}
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
