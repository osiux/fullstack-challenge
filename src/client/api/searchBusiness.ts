import ky from 'ky';

import { Business } from '@server/types';

const searchBusiness = async (
    _: string,
    term: string,
    location: string,
    radius = ''
): Promise<Business[]> => {
    const params = new URLSearchParams();
    params.set('term', term);
    params.set('location', location);
    radius && params.set('radius', radius);

    const response: Business[] = await ky
        .get('/api/search', {
            searchParams: params,
        })
        .json();

    return response;
};

export default searchBusiness;
