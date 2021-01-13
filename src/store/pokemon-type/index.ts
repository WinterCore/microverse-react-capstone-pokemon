import { Reducer } from 'redux';

import { NamedApiResource, PokemonType } from '../../api/models';
import { ApiResourceState }              from '../utils';

import { FETCH_POKEMON_TYPE, FETCH_POKEMON_TYPE_ERROR, FETCH_POKEMON_TYPE_SUCCESS, ActionUnion } from './actions';

export type PokemonTypeState = ApiResourceState<PokemonType<NamedApiResource> | null>;

export const INITIAL_STATE: PokemonTypeState = {
    data      : null,
    isLoading : false,
    error     : null,
};

const pokemonReducer: Reducer<PokemonTypeState> = (state: PokemonTypeState = INITIAL_STATE, action: ActionUnion) => {
    switch (action.type) {
        case FETCH_POKEMON_TYPE:
            return { data: null, isLoading: true, error: null };
        case FETCH_POKEMON_TYPE_SUCCESS:
            return { data: action.payload, isLoading: false, error: null };
        case FETCH_POKEMON_TYPE_ERROR:
            return { data: null, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default pokemonReducer;
