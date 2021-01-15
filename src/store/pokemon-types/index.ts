import { Reducer } from 'redux';

import { NamedApiResource, PaginatedResource } from '../../api/models';
import { ApiResourceState }                    from '../utils';

import { FETCH_POKEMON_TYPES, FETCH_POKEMON_TYPES_ERROR, FETCH_POKEMON_TYPES_SUCCESS, ActionUnion } from './actions';

export type PokemonTypesState = ApiResourceState<PaginatedResource<NamedApiResource[]>  | null>;

export const INITIAL_STATE: PokemonTypesState = {
    data      : null,
    isLoading : false,
    error     : null,
};

const pokemonReducer: Reducer<PokemonTypesState> = (state: PokemonTypesState = INITIAL_STATE, action: ActionUnion) => {
    switch (action.type) {
        case FETCH_POKEMON_TYPES:
            return { data: null, isLoading: true, error: null };
        case FETCH_POKEMON_TYPES_SUCCESS:
            return { data: action.payload, isLoading: false, error: null };
        case FETCH_POKEMON_TYPES_ERROR:
            return { data: null, isLoading: false, error: action.payload };
        default:
            return state;
    }
};

export default pokemonReducer;
