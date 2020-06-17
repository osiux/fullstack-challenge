import ky from 'ky';

import { Tour } from '@server/types';

const fetchTour = async (_: string, tourId: string): Promise<Tour> => {
    const response: Tour = await ky.get(`/api/tours/${tourId}`).json();

    return response;
};

export default fetchTour;
