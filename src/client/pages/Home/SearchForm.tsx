import React from 'react';
import tw from 'twin.macro';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Form = tw.form`w-full max-w-full flex flex-wrap mt-3`;

const InputContainer = tw.div`w-full md:w-1/2 px-3 mb-2 md:mb-0`;

const Label = tw.label`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`;

const Input = tw.input`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`;

const BaseButton = css`
    ${tw`cursor-pointer inline-block w-1/2 tracking-wider text-white leading-loose font-bold py-2 mt-6 mb-3 rounded`};
`;

const SubmitButton = styled.button`
    ${BaseButton}
    ${tw`bg-blue-700`}
`;

const ResetButton = styled.button`
    ${BaseButton}
    ${tw`bg-gray-700 mr-2`}
`;

export type FormData = {
    term: string;
    location: string;
    radius?: string;
};

type SearchFormProps = {
    onSubmit: (values: FormData) => void;
    onReset: () => void;
};

const SearchForm = ({ onSubmit, onReset }: SearchFormProps) => {
    const { register, handleSubmit } = useForm<FormData>();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <Label htmlFor="term">What are you looking for?</Label>
                <Input
                    type="search"
                    name="term"
                    id="term"
                    ref={register}
                    placeholder="sushi, tacos, etc"
                    required
                />
            </InputContainer>
            <InputContainer>
                <Label htmlFor="term">Where?</Label>
                <Input
                    type="text"
                    name="location"
                    id="location"
                    ref={register}
                    placeholder="Santa Monica or 90210"
                    required
                />
            </InputContainer>
            <InputContainer>
                <Label htmlFor="radius">Radius (Optional, in miles)</Label>
                <Input type="number" name="radius" id="radius" ref={register} />
            </InputContainer>
            <InputContainer css={tw`flex justify-between`}>
                <ResetButton type="reset" onClick={onReset}>
                    Reset Search
                </ResetButton>
                <SubmitButton type="submit">
                    Search
                    <FontAwesomeIcon icon={faSearch} fixedWidth />
                </SubmitButton>
            </InputContainer>
        </Form>
    );
};

export default SearchForm;
