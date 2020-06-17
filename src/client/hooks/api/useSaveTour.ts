import { useContext } from 'react';
import { useMutation } from 'react-query';

import saveTour from '@client/api/saveTour';
import TourContext from '@client/context/TourContext';

const useSaveTour = () => {
    const [, dispatch] = useContext(TourContext);

    return useMutation(saveTour, {
        onSuccess: (data) => {
            dispatch({ type: 'SET_ID', payload: data.tourId });
        },
    });
};

export default useSaveTour;
