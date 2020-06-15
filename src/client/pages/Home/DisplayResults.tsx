import React, { memo, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import matchSorter from 'match-sorter';

import { Business } from '@server/types';

import useDebounce from '@client/hooks/useDebounce';

import BusinessItem from '@client/components/BusinessItem';

const Container = tw.section`grid grid-flow-row grid-cols-3 gap-2`;
const FilterRow = tw.div`col-span-3 border-t-2 flex flex-col md:flex-row justify-between pt-5 mt-3`;
const FilterInput = tw.input`appearance-none border block bg-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-full md:w-1/3`;
const FilterBy = tw.div`mt-2 w-full md:w-2/3 text-right`;
const FilterByItem = styled.span`
    ${tw`py-2 px-4 mx-2 rounded-full cursor-pointer`}

    &.active, &:hover {
        ${tw`bg-red-600 text-white`}
    }
`;

type DisplayResultsProps = {
    businesses: Business[];
};

const sortByItems = {
    best_match: 'Best Match',
    name: 'Name',
    rating: 'Rating',
    distance: 'Distance',
};

const DisplayResults = ({ businesses }: DisplayResultsProps) => {
    const [debouncedSearchTerm, searchTerm, setSearchTerm] = useDebounce(
        '',
        300
    );
    const [sortBy, setSortBy] = useState('best_match');

    const results = useMemo(() => {
        const newResult = matchSorter(businesses, debouncedSearchTerm, {
            keys: ['name'],
        });

        let sortedResults: Business[] = newResult;

        switch(sortBy) {
            case 'name':
                sortedResults = newResult.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                sortedResults = newResult.sort((a, b) => a.rating < b.rating ? 1 : -1);
                break;
            case 'distance':
                sortedResults = newResult.sort((a, b) => a.distance > b.distance ? 1 : -1);
                break;
        }

        return sortedResults;
    }, [debouncedSearchTerm, businesses, sortBy]);

    return (
        <Container>
            <FilterRow>
                <FilterInput
                    type="search"
                    name="search"
                    placeholder="Filter by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterBy>
                    <strong>Sort by: </strong>
                    {Object.keys(sortByItems).map((item) => {
                        const onClick = () => setSortBy(item);

                        return (
                            <FilterByItem
                                key={item}
                                onClick={onClick}
                                className={sortBy === item ? 'active' : ''}
                            >
                                {sortByItems[item]}
                            </FilterByItem>
                        );
                    })}
                </FilterBy>
            </FilterRow>
            {results.map((business) => {
                return <BusinessItem key={business.id} business={business} />;
            })}
        </Container>
    );
};

export default memo(DisplayResults);
