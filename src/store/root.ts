import { combineReducers }                from 'redux';
import { connectRouter, RouterRootState } from 'connected-react-router';
import { History }                        from 'history';

import pokemon, { PokemonState }           from './pokemon/index';
import pokemonTypes, { PokemonTypesState } from './pokemon-types/index';

export type AppInitialState = {
    pokemon: PokemonState;
    pokemonTypes: PokemonTypesState;
};

export type InitialState = AppInitialState & RouterRootState;

export const INITIAL_STATE: AppInitialState = {
    pokemon      : { data: null, error: null, isLoading: false },
    pokemonTypes : { data: null, error: null, isLoading: false },
};

const createRootReducer = (history: History) => (
    combineReducers({
        router: connectRouter(history),
        pokemonTypes,
        pokemon,
    })
);

export default createRootReducer;
