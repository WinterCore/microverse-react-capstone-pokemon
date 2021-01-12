import { Dispatch }      from 'redux';
import { AxiosResponse } from 'axios';

import Api, { extractIdFromUrl, GET_TYPE, GET_POKEMONS } from '../../api/index';
import { createAction }                                  from '../utils';
import { GetPokemonsResponse, GetPokemonTypeResponse }   from '../../api/responses';
import { NamedApiResource, PokemonType }                 from '../../api/models';

export const FETCH_POKEMON_TYPE         = 'FETCH_POKEMON_TYPE';
export const FETCH_POKEMON_TYPE_ERROR   = 'FETCH_POKEMON_TYPE_ERROR';
export const FETCH_POKEMON_TYPE_SUCCESS = 'FETCH_POKEMON_TYPE_SUCCESS';

export type FetchPokemonType = {
    type : typeof FETCH_POKEMON_TYPE;
};

export type FetchPokemonTypeSuccess = {
    type    : typeof FETCH_POKEMON_TYPE_SUCCESS;
    payload : PokemonType<NamedApiResource>;
};

export type FetchPokemonTypeError = {
    type    : typeof FETCH_POKEMON_TYPE_ERROR;
    payload : string;
};

export type ActionUnion = FetchPokemonType | FetchPokemonTypeSuccess | FetchPokemonTypeError;

export const fetch = (id: number) =>
    async (dispatch: Dispatch<ActionUnion>): Promise<void> => {
        dispatch(createAction<typeof FETCH_POKEMON_TYPE, undefined>(FETCH_POKEMON_TYPE, undefined));
        try {
            if (id === -1) {
                const { data }: AxiosResponse<GetPokemonsResponse> = await Api(GET_POKEMONS());
                const formatted: PokemonType<NamedApiResource> = {
                    id      : -1,
                    name    : 'All',
                    pokemon : data.results.map(({ name, url }) => ({ pokemon: { name, id: extractIdFromUrl('/pokemon', url) }}))
                };
                dispatch(createAction<typeof FETCH_POKEMON_TYPE_SUCCESS, PokemonType<NamedApiResource>>(FETCH_POKEMON_TYPE_SUCCESS, formatted));
            } else {
                const { data }: AxiosResponse<GetPokemonTypeResponse> = await Api(GET_TYPE(id));
                const formatted: PokemonType<NamedApiResource> = {
                    ...data,
                    pokemon: data.pokemon.map(({ pokemon : { name, url } }) => ({ pokemon: { name, id: extractIdFromUrl('/pokemon', url) }}))
                };

                dispatch(createAction<typeof FETCH_POKEMON_TYPE_SUCCESS, PokemonType<NamedApiResource>>(FETCH_POKEMON_TYPE_SUCCESS, formatted));
            }
        } catch (e) {
            dispatch(createAction<typeof FETCH_POKEMON_TYPE_ERROR, string>(FETCH_POKEMON_TYPE_ERROR, 'Something happened'));
        }
    };
