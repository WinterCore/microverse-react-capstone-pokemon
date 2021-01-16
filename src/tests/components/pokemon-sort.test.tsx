import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import axios from '../../api/index';

import PokemonSort from '../../components/pokemon-sort';
import PokemonGrid from '../../components/pokemon-grid';

import * as data from '../pokmeon-data';

import { render } from '../test-utils';
import { capitalize, pokemonSorter } from '../../utils';
import { SortFilter } from '../../store/filter/actions';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_TYPE: jest.fn(),
  GET_POKEMONS: jest.fn(),
  POKEMON_ART_BASE_URL: jest.fn(),
}));

const mockedAxios = (axios as unknown) as jest.Mock;

describe('PokemonSort Component', () => {
  it('Changes the order of the rendered pokemons', async () => {
    mockedAxios.mockImplementationOnce(() => (
      Promise.resolve({ data: data.paginatedResponse(data.pokemonsResponse) })
    ));

    render(
      <div>
        <PokemonSort />
        <PokemonGrid />
      </div>,
    );

    fireEvent.change(screen.getByTestId('sortSelect'), {
      target: { value: SortFilter.Desc },
    });

    await waitFor(() => {
      const grid = screen.getByTestId('pokemonsGrid');
      const items = pokemonSorter(data.pokemonsResource, SortFilter.Desc);
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        expect(grid.childNodes[i].childNodes[0].textContent).toEqual(
          capitalize(item.name),
        );
      }
    });
  });
});
