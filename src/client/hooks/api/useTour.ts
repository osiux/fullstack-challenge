import { useQuery } from 'react-query';

import fetchTour from '@client/api/fetchTour';

const useTour = (tourId: string) => {
    const { data, status } = useQuery(['business', tourId], fetchTour);

    return { data, status };
};

export default useTour;

