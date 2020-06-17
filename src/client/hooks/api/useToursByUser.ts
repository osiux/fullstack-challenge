import { useContext } from 'react';
import { useQuery } from 'react-query';

import UserContext from '@client/context/UserContext';
import fetchToursByUser from '@client/api/fetchToursByUser';

const useToursByUser = () => {
    const userId = useContext(UserContext);

    return useQuery(() => {
        if (!userId) return false;

        return ['user:tours', userId];
    }, fetchToursByUser);
};

export default useToursByUser;
