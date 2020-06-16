import React, {
    memo,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import tw from 'twin.macro';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import TourBusinessItem from '@client/components/TourBusinessItem';

import TourContext from '@client/context/TourContext';

const Container = tw.aside`col-span-3 md:col-span-1 min-h-full p-3`;
const ItemsContainer = tw.div`sticky top-0 self-start`;
const Instructions = tw.p`mb-3 text-center`;

const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const TourBuilder = () => {
    const [{ name, ids }, dispatch] = useContext(TourContext);
    const [idsToRender, setIdsToRender] = useState(ids);

    useEffect(() => {
        setIdsToRender(ids);
    }, [ids]);

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
