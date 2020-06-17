import React, { useReducer } from 'react';

interface TourContextProviderProps {
    children: React.ReactNode;
}

type TourState = {
    id: string | null;
    name: string;
    places: string[];
};

type AddAction = {
    type: 'ADD';
    payload: string;
};

type RemoveAction = {
    type: 'REMOVE';
    payload: string;
};

type SetidAction = {
    type: 'SET_ID';
    payload: string;
};

type SetNameAction = {
    type: 'SET_NAME';
    payload: string;
};

type SetReorderedIds = {
    type: 'SET_REORDERED_PLACES';
    payload: string[];
};

type ResetAction = {
    type: 'RESET';
};

type ActionType =
    | AddAction
    | RemoveAction
    | SetidAction
    | SetNameAction
    | SetReorderedIds
    | ResetAction;

const tourReducer = (state: TourState, action: ActionType): TourState => {
    switch (action.type) {
        case 'ADD':
            return { ...state, places: [...state.places, action.payload] };
        case 'REMOVE': {
            const places = state.places;

            const newPlaces = places.filter((item) => item !== action.payload);

            return { ...state, places: newPlaces };
        }
        case 'SET_ID':
            return { ...state, id: action.payload };
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_REORDERED_PLACES':
            return { ...state, places: action.payload };
        case 'RESET':
            return tourInitialState;
        default:
            return state;
    }
};

const tourInitialState: TourState = {
    id: null,
    name: '',
    places: [],
};

const TourContext = React.createContext<
    [TourState, React.Dispatch<ActionType>]
>([tourInitialState, () => null]);

export const TourContextProvider = ({ children }: TourContextProviderProps) => {
    const [state, dispatch] = useReducer(tourReducer, tourInitialState);

    return (
        <TourContext.Provider value={[state, dispatch]}>
            {children}
        </TourContext.Provider>
    );
};

export default TourContext;
