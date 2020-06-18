import React, { Fragment } from 'react';
import tw from 'twin.macro';
import { useClipboard } from 'use-clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCode,
    faFileCsv,
    faFilePdf,
    faClipboard,
} from '@fortawesome/free-solid-svg-icons';

const TourOptionsContainer = tw.div`flex justify-start items-center`;
const LinkInput = tw.input`appearance-none block w-auto bg-gray-100 text-gray-700 border rounded py-3 px-2 ml-1 leading-tight focus:outline-none focus:bg-white`;

type TourActionsProps = {
    tourId: string;
};

const TourActions = ({ tourId }: TourActionsProps) => {
    const clipboard = useClipboard();

    const tourUrl = `${window.location.protocol}//${window.location.host}/tour/${tourId}`;

    return (
        <Fragment>
            <TourOptionsContainer>
                <strong>Download Tour as: </strong>
                <a
                    href={`/api/tours/${tourId}/download?format=pdf`}
                    title="Download as PDF"
                >
                    <FontAwesomeIcon icon={faFilePdf} size="2x" fixedWidth />
                </a>
                <a
                    href={`/api/tours/${tourId}/download?format=csv`}
                    title="Download as CSV"
                >
                    <FontAwesomeIcon icon={faFileCsv} size="2x" fixedWidth />
                </a>
                <a
                    href={`/api/tours/${tourId}/download?format=json`}
                    title="Download as JSON"
                >
                    <FontAwesomeIcon icon={faFileCode} size="2x" fixedWidth />
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
                    <FontAwesomeIcon size="2x" icon={faClipboard} fixedWidth />
                </a>
            </TourOptionsContainer>
        </Fragment>
    );
};

export default TourActions;
