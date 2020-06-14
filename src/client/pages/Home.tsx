import React from 'react';
import tw from 'twin.macro';

const Container = tw.div`grid grid-cols-1 md:grid-cols-3`;

const SearchSection = tw.section`col-span-3 md:col-span-2 p-3`;

const TourBuilder = tw.aside`col-span-3 md:col-span-1`;

const InputContainer = tw.div`w-3/4 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative`;

const SearchInput = tw.input`appearance-none w-full outline-none focus:outline-none active:outline-none`;

const SearchButton = tw.button`ml-1 outline-none focus:outline-none active:outline-none`;

const Svg = tw.svg`w-6 h-6`;

const Home = () => {
    return (
        <Container>
            <SearchSection>
                <InputContainer>
                    <SearchInput
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Enter a location"
                    />
                    <SearchButton
                        type="submit"
                    >
                        <Svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </Svg>
                    </SearchButton>
                </InputContainer>
            </SearchSection>
            <TourBuilder>
                Select places to add to your tour.
            </TourBuilder>
        </Container>
    );
};

export default Home;
