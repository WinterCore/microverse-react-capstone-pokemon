export type NamedApiResource = {
    id   : number;
    name : string;
};

export type Pokemon = {
    id      : number;
    name    : string;
    height  : number;
    types   : { type: { name: string; url: string; }; }[];
    stats   : { base_stat: number; stat: { name: string; }; }[];
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
