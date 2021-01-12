import { Reducer } from 'redux';

import { Pokemon }          from '../../api/models';
import { ApiResourceState } from '../utils';

import { FETCH_POKEMON, FETCH_POKEMON_ERROR, FETCH_POKEMON_SUCCESS, ActionUnion } from './actions';

export type PokemonState = ApiResourceState<Pokemon | null>;

const INITIAL_STATE = {
    data      : null,
    isLoading : false,
    error     : null,
};

const pokemonReducer: Reducer<PokemonState> = (state: PokemonState = INITIAL_STATE, action: ActionUnion) => {
    switch (action.type) {
        case FETCH_POKEMON:
            return { data: null, isLoading: true, error: null };
        case FETCH_POKEMON_SUCCESS:
            return { data: action.payload, isLoading: false, error: null };
        case FETCH_POKEMON_ERROR:
            return { data: null, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default pokemonReducer;
