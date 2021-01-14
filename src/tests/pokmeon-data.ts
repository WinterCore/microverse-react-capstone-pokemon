import { NamedApiResource, PaginatedResource, Pokemon, PokemonType } from '../api/models';
import { NamedApiResponse } from '../api/responses';
import {extractIdFromUrl} from '../utils';

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

export const pokemonTypesResource: NamedApiResource[] = pokemonTypesResponse.map(x => ({ name: x.name, id: extractIdFromUrl('/type', x.url) }));

export const pokemonTypeResponse: PokemonType<NamedApiResponse> = {
    id: 1,
    name: 'dummytype1',
    pokemon: [
        { pokemon: { url: '/pokemon/2', name: 'dummypokemon2' } },
        { pokemon: { url: '/pokemon/1', name: 'dummypokemon1' } },
        { pokemon: { url: '/pokemon/3', name: 'dummypokemon3' } },
    ]
};

export const pokemonTypeResource: PokemonType<NamedApiResource> = {
    ...pokemonTypeResponse,
    pokemon: pokemonTypeResponse.pokemon.map(x => ({ pokemon: { id: extractIdFromUrl('/pokemon', x.pokemon.url), name: x.pokemon.name } })),
};


export const pokemonsResponse: NamedApiResponse[] = [
    { url: '/pokemon/1', name: 'dummypokemon1' },
    { url: '/pokemon/2', name: 'dummypokemon2' },
    { url: '/pokemon/3', name: 'dummypokemon3' },
];


export const pokemonsResource: NamedApiResource[] = pokemonsResponse.map(x => ({ id: extractIdFromUrl('/pokemon', x.url), name: x.name }));
