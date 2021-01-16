import * as utils from '../utils';
import { SortFilter } from '../store/filter/actions';
import { NamedApiResource } from '../api/models';

describe('Utils', () => {
  describe('capitalize', () => {
    it('Should capitalize the first letter of provided strings.', () => {
      const str = 'testerino';

      expect(utils.capitalize(str)).toBe('Testerino');
    });
  });

  describe('pokemonSorter', () => {
    const pokemons: NamedApiResource[] = [
      { name: 'myz', id: 1 },
      { name: 'abc', id: 2 },
      { name: 'xyz', id: 3 },
    ];

    it('Should sort pokemons A-Z when provided with the ASC Sorter', () => {
      const expected: NamedApiResource[] = [
        { name: 'abc', id: 2 },
        { name: 'myz', id: 1 },
        { name: 'xyz', id: 3 },
      ];
      expect(utils.pokemonSorter(pokemons, SortFilter.Asc)).toEqual(expected);
    });

    it('Should sort pokemons Z-A when provided with the DESC Sorter', () => {
      const expected: NamedApiResource[] = [
        { name: 'xyz', id: 3 },
        { name: 'myz', id: 1 },
        { name: 'abc', id: 2 },
      ];
      expect(utils.pokemonSorter(pokemons, SortFilter.Desc)).toEqual(expected);
    });

    it('Should return the pokemons unmodified when provided with the Default Sorter', () => {
      expect(utils.pokemonSorter(pokemons, SortFilter.Default)).toEqual(
        pokemons,
      );
    });
  });

  describe('extractIdFromUrl', () => {
    it('Should extract item id from a url correctly', () => {
      const url = 'https://potato.com/pokemon/3';

      expect(utils.extractIdFromUrl('/pokemon', url)).toBe(3);
    });

    it('Should return -1 when no id could be extracted', () => {
      const url = 'https://potato.com/pokemon/test/123';

      expect(utils.extractIdFromUrl('/pokemon', url)).toBe(-1);
    });
  });
});
