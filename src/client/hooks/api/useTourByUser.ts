import { useQuery } from 'react-query';

import fetchToursByUser from '@client/api/fetchToursByUser';

const useTourByUser = (userId: string) => {
    return useQuery(() => {
        if (!userId) return false;

        return ['user', userId, 'tours'];
    }, fetchToursByUser);
};

export default useTourByUser;
