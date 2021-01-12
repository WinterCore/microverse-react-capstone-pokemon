import { combineReducers } from 'redux';
import { connectRouter }   from 'connected-react-router';
import { History }         from 'history';

import pokemon, { PokemonState } from './pokemon/index';

export type InitialState = {
    pokemon: PokemonState;
};

export const INITIAL_STATE: InitialState = {
    pokemon: { data: null, error: null, isLoading: false },
};

const createRootReducer = (history: History) => (
    combineReducers({
        router: connectRouter(history),
        pokemon,
    })
);

export default createRootReducer;
