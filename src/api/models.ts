export type NamedApiResource = {
    id   : number;
    name : string;
};

export type Pokemon = {
    id      : number;
    name    : string;
    height  : number;
    sprites : { 'official-artwork': { front_default: string } }
};

export type PokemonType<T> = {
    id      : number;
    name    : string;
    pokemon : { pokemon: T }[]
};

export type PaginatedResource<T> = {
    count    : number;
    next     : null | string;
    previous : null | string;
    results  : T;
};
