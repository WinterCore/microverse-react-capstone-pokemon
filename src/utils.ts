import { NamedApiResource } from './api/models';
import { SortFilter } from './store/filter/actions';

export const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const pokemonSorter = (
  pokemons: NamedApiResource[],
  filter: SortFilter,
): NamedApiResource[] => {
  switch (filter) {
    case SortFilter.Asc:
      return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    case SortFilter.Desc:
      return pokemons.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return pokemons;
  }
};

export const extractIdFromUrl = (urlType: string, str: string): number => {
  const idx = str.indexOf(urlType);
  const match = /^\/(?<id>\d+)\/?/.exec(str.slice(idx + urlType.length));
  if (!match || !match.groups) {
    return -1;
  }
  return +match.groups.id;
};
