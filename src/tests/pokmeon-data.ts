import { NamedApiResource, PaginatedResource, Pokemon, PokemonType } from '../api/models';
import { NamedApiResponse } from '../api/responses';

export const pokemon: Pokemon = {
    id     : 1,
    name   : 'test',
    height : 15,
    types  : [{ type: { name: 'testype', url: 'what' } }],
    stats  : [{ base_stat: 15, stat: { name: 'stat' } }]
};

export const paginatedResponse = <T>(data: T): PaginatedResource<T> => {
    return {
        count    : 20,
        next     : null,
        previous : null,
        results  : data
    };
};

export const pokemonTypesResponse: NamedApiResponse[] = [
    { url: '/type/1', name: 'dummytype1' },
    { url: '/type/2', name: 'dummytype2' },
    { url: '/type/3', name: 'dummytype3' },
];

export const pokemonTypesResource: NamedApiResource[] = [
    { id: 1, name: 'dummytype1' },
    { id: 2, name: 'dummytype2' },
    { id: 3, name: 'dummytype3' },
];

export const pokemonTypeResponse: PokemonType<NamedApiResponse> = {
    id: 1,
    name: 'dummytype1',
    pokemon: [{ pokemon: { url: '/pokemon/1', name: 'dummypokemon1' } }]
};

export const pokemonTypeResource: PokemonType<NamedApiResource> = {
    id: 1,
    name: 'dummytype1',
    pokemon: [{ pokemon: { id: 1, name: 'dummypokemon1' } }]
};
