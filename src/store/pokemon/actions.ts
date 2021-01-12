import { Dispatch }      from 'redux';
import { AxiosResponse } from 'axios';

import Api, { GET_POKEMON } from '../../api/index';
import { Pokemon }          from '../../api/models';
import { createAction }     from '../utils';

export const FETCH_POKEMON         = 'FETCH_POKEMON';
export const FETCH_POKEMON_ERROR   = 'FETCH_POKEMON_ERROR';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';

export type FetchPokemon = {
    type : typeof FETCH_POKEMON;
};

export type FetchPokemonSuccess = {
    type    : typeof FETCH_POKEMON_SUCCESS;
    payload : Pokemon;
};

export type FetchPokemonError = {
    type    : typeof FETCH_POKEMON_ERROR;
    payload : string;
};

export type ActionUnion = FetchPokemon | FetchPokemonSuccess | FetchPokemonError;

export const fetch = (id: number) =>
    async (dispatch: Dispatch<ActionUnion>): Promise<void> => {
        dispatch(createAction<typeof FETCH_POKEMON, undefined>(FETCH_POKEMON, undefined));
        try {
            const { data }: AxiosResponse<Pokemon> = await Api(GET_POKEMON(id));
            dispatch(createAction<typeof FETCH_POKEMON_SUCCESS, Pokemon>(FETCH_POKEMON_SUCCESS, data));
        } catch (e) {
            dispatch(createAction<typeof FETCH_POKEMON_ERROR, string>(FETCH_POKEMON_ERROR, 'Something happened'));
        }
    };
