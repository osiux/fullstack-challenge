import ky from 'ky';

import { PostTour } from '@server/types';

const saveTour = async (data: PostTour): Promise<{ tourId: string }> => {
    return await ky
        .post('/api/tours', {
            json: data,
        })
        .json();
};

export default saveTour;
