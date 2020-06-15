import { useQuery } from 'react-query';

import searchBusiness from '@client/api/searchBusiness';

const useSearchResults = (
    term: string,
    location: string,
    radius: string | undefined
) => {
    const { data, status } = useQuery(() => {
        if (!term || !location) return false;

        return ['search', term, location, radius];
    }, searchBusiness);

    return { data, status };
};

export default useSearchResults;
