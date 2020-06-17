import ky from 'ky';

import { Tour } from '@server/types';

const fetchTourByUser = async (_: string, userId: string): Promise<Tour[]> => {
    const response: Tour[] = await ky.get(`/api/user/${userId}/tours`).json();

    return response;
};

export default fetchTourByUser;
