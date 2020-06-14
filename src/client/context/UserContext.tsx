import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import useLocalStorage from '@client/hooks/useLocalStorage';

const USER_CONTEXT = 'USER_CONTEXT';

const UserContext = React.createContext(USER_CONTEXT);

interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userUuid, setUserUuid] = useLocalStorage('user-uuid', '');

    if (!userUuid) {
        setUserUuid(uuidv4());
    }

    return (
        <UserContext.Provider value={userUuid}>{children}</UserContext.Provider>
    );
};

export default UserContext;
