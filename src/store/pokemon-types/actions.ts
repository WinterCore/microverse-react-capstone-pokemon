import { Dispatch }      from 'redux';
import { AxiosResponse } from 'axios';

import Api, { GET_TYPES }                      from '../../api/index';
import { createAction }                        from '../utils';
import { GetPokemonTypesResponse }             from '../../api/responses';
import { NamedApiResource, PaginatedResource } from '../../api/models';
import { extractIdFromUrl }                    from '../../utils';

export const FETCH_POKEMON_TYPES         = 'FETCH_POKEMON_TYPES';
export const FETCH_POKEMON_TYPES_ERROR   = 'FETCH_POKEMON_TYPES_ERROR';
export const FETCH_POKEMON_TYPES_SUCCESS = 'FETCH_POKEMON_TYPES_SUCCESS';

export type FetchPokemonTypes = {
    type : typeof FETCH_POKEMON_TYPES;
};

export type FetchPokemonTypesSuccess = {
    type    : typeof FETCH_POKEMON_TYPES_SUCCESS;
    payload : PaginatedResource<NamedApiResource[]>;
};

export type FetchPokemonTypesError = {
    type    : typeof FETCH_POKEMON_TYPES_ERROR;
    payload : string;
};

export type ActionUnion = FetchPokemonTypes | FetchPokemonTypesSuccess | FetchPokemonTypesError;

export const fetch = () =>
    async (dispatch: Dispatch<ActionUnion>): Promise<void> => {
        dispatch(createAction<typeof FETCH_POKEMON_TYPES, undefined>(FETCH_POKEMON_TYPES, undefined));
        try {
            const { data }: AxiosResponse<GetPokemonTypesResponse> = await Api(GET_TYPES());
            const formatted: PaginatedResource<NamedApiResource[]> = {
                ...data,
                results: data.results.map(({ url, name }) => ({ name, id: extractIdFromUrl('/type', url) }))
            };

            dispatch(createAction<typeof FETCH_POKEMON_TYPES_SUCCESS, PaginatedResource<NamedApiResource[]>>(FETCH_POKEMON_TYPES_SUCCESS, formatted));
        } catch (e) {
            dispatch(createAction<typeof FETCH_POKEMON_TYPES_ERROR, string>(FETCH_POKEMON_TYPES_ERROR, 'Something happened'));
        }
    };
