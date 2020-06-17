import { useMutation } from 'react-query';

import saveTour from '@client/api/saveTour';

const useSaveTour = () => {
    return useMutation(saveTour);
};

export default useSaveTour;
