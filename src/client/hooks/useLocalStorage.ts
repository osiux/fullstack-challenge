// Took and adapted to TS from https://usehooks.com/useLocalStorage/
import { useCallback, useState } from 'react';

const useLocalStorage = <T = string>(
    key: string,
    initialValue: T
): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);

            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                setStoredValue(value);

                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.log(error);
            }
        },
        [key]
    );

    return [storedValue, setValue];
};

export default useLocalStorage;
