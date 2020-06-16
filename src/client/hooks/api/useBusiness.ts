import { useQuery } from 'react-query';

import fetchBusiness from '@client/api/fetchBusiness';

const useBusiness = (businessId: string) => {
    const { data, status } = useQuery(['business', businessId], fetchBusiness);

    return { data, status };
};

export default useBusiness;

