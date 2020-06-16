import ky from 'ky';

import { Business } from '@server/types';

const fetchBusiness = async (
    _: string,
    businessId: string
): Promise<Business> => {
    const response: Business = await ky
        .get(`/api/business/${businessId}`)
        .json();

    return response;
};

export default fetchBusiness;
