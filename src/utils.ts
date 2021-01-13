import { NamedApiResource } from "./api/models";
import { SortFilter }       from "./store/filter";

export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;


export const pokemonSorter = (pokemons: NamedApiResource[], filter: SortFilter) => {
    switch (filter) {
    case SortFilter.Default:
        return pokemons;
    case SortFilter.Asc:
        return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    case SortFilter.Desc:
        return pokemons.sort((a, b) => b.name.localeCompare(a.name));
    }
};
