import React, { memo, useState, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import matchSorter from 'match-sorter';

import { Business } from '@server/types';

import useDebounce from '@client/hooks/useDebounce';

import BusinessItem from '@client/components/BusinessItem';

const Container = tw.section`grid grid-flow-row grid-cols-3 gap-2`;
const FilterRow = tw.div`col-span-3 border-t-2 flex flex-col md:flex-row justify-between pt-5 mt-3`;
const FilterInput = tw.input`appearance-none border block bg-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-full md:w-1/3`;
const FilterBy = tw.div`w-full md:w-2/3 text-left ml-4`;
const Br = tw.br`mb-2`;
const FilterByItem = styled.span`
    ${tw`py-1 px-4 mx-2 rounded-full cursor-pointer`}

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

const filterByRatingItems = {
    1: '1 star',
    2: '2 stars',
    3: '3 stars',
    4: '4 stars',
    5: '5 stars',
};

const DisplayResults = ({ businesses }: DisplayResultsProps) => {
    const [debouncedSearchTerm, searchTerm, setSearchTerm] = useDebounce(
        '',
        300
    );
    const [sortBy, setSortBy] = useState('best_match');
    const [filterByRating, setFilterByRating] = useState<string[]>(
        Object.keys(filterByRatingItems)
    );

    const results = useMemo(() => {
        const newResults = matchSorter(businesses, debouncedSearchTerm, {
            keys: ['name'],
        });

        let filteredResults: Business[] = newResults;
        if (filterByRating.length > 0) {
            filteredResults = newResults.filter((business) => {
                const roundedRating = Math.floor(business.rating).toString();

                return filterByRating.includes(roundedRating);
            });
        }

        switch (sortBy) {
            case 'name':
                return filteredResults.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            case 'rating':
                return filteredResults.sort((a, b) =>
                    a.rating < b.rating ? 1 : -1
                );
            case 'distance':
                return filteredResults.sort((a, b) =>
                    a.distance > b.distance ? 1 : -1
                );
            default:
                return filteredResults;
        }
    }, [debouncedSearchTerm, sortBy, filterByRating, businesses]);

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
                        const onClickSort = () => setSortBy(item);

                        return (
                            <FilterByItem
                                key={item}
                                onClick={onClickSort}
                                className={sortBy === item ? 'active' : ''}
                            >
                                {sortByItems[item]}
                            </FilterByItem>
                        );
                    })}
                    <Br />
                    <strong>Rating:</strong>
                    {Object.keys(filterByRatingItems).map((item) => {
                        const onClickRating = () => {
                            if (filterByRating.includes(item)) {
                                const newItems = filterByRating.filter(
                                    (current) => current !== item
                                );
                                setFilterByRating(newItems);
                            } else {
                                setFilterByRating((prev) => [...prev, item]);
                            }
                        };

                        return (
                            <FilterByItem
                                key={item}
                                onClick={onClickRating}
                                className={
                                    filterByRating.includes(item)
                                        ? 'active'
                                        : ''
                                }
                            >
                                {filterByRatingItems[item]}
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
