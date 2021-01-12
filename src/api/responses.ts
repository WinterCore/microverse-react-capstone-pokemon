import { Pokemon, PaginatedResource, PokemonType } from './models';

export type NamedApiResponse = {
    url  : string;
    name : string;
};

export type GetPokemonTypesResponse = PaginatedResource<NamedApiResponse[]>;
export type GetPokemonResponse      = Pokemon;
export type GetPokemonsResponse     = PaginatedResource<NamedApiResponse[]>;
export type GetPokemonTypeResponse  = PokemonType<NamedApiResponse>;
