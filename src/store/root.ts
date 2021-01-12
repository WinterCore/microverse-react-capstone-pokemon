import { combineReducers }                from 'redux';
import { connectRouter, RouterRootState } from 'connected-react-router';
import { History }                        from 'history';

import pokemon, { PokemonState }           from './pokemon/index';
import pokemonTypes, { PokemonTypesState } from './pokemon-types/index';
import pokemonType, { PokemonTypeState }   from './pokemon-type/index';

export type AppInitialState = {
    pokemon      : PokemonState;
    pokemonTypes : PokemonTypesState;
    pokemonType  : PokemonTypeState;
};

export type InitialState = AppInitialState & RouterRootState;

export const INITIAL_STATE: AppInitialState = {
    pokemon      : { data: null, error: null, isLoading: false },
    pokemonTypes : { data: null, error: null, isLoading: false },
    pokemonType  : { data: null, error: null, isLoading: false },
};

const createRootReducer = (history: History) => (
    combineReducers({
        router: connectRouter(history),
        pokemonTypes,
        pokemonType,
        pokemon,
    })
);

export default createRootReducer;
