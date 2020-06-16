import React, { useReducer } from 'react';

interface TourContextProviderProps {
    children: React.ReactNode;
}

type TourState = {
    id: string | null;
    name: string;
    ids: string[];
};

type AddAction = {
    type: 'ADD';
    payload: string;
};

type RemoveAction = {
    type: 'REMOVE';
    payload: string;
};

type SetNameAction = {
    type: 'SET_NAME';
    payload: string;
};

type SetReorderedIds = {
    type: 'SET_REORDERED_IDS';
    payload: string[];
};

type ResetAction = {
    type: 'RESET';
};

type ActionType =
    | AddAction
    | RemoveAction
    | SetNameAction
    | SetReorderedIds
    | ResetAction;

const tourReducer = (state: TourState, action: ActionType): TourState => {
    switch (action.type) {
        case 'ADD':
            return { ...state, ids: [...state.ids, action.payload] };
        case 'REMOVE': {
            const ids = state.ids;

            const newIds = ids.filter((item) => item !== action.payload);

            return { ...state, ids: newIds };
        }
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_REORDERED_IDS':
            return { ...state, ids: action.payload };
        case 'RESET':
            return tourInitialState;
        default:
            return state;
    }
};

const tourInitialState: TourState = {
    id: null,
    name: '',
    ids: [],
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
