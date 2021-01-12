export type NamedApiResource = {
    name : string;
    url  : string;
};

export type Pokemon = {
    id      : number;
    name    : string;
    height  : number;
    sprites : { 'official-artwork': { front_default: string } }
};

export type PokemonType = {
    id      : number;
    name    : string;
    pokemon : { pokemon: NamedApiResource }[]
};
