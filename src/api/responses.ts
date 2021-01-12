import { Pokemon, PaginatedResource } from './models';

export type NamedApiResponse = {
    url  : string;
    name : string;
};

export type GetPokemonTypesResponse = PaginatedResource<NamedApiResponse[]>;
export type GetPokemonResponse      = Pokemon;

