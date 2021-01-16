import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import Pokemon from '../../components/pokemon';
import * as data from '../pokmeon-data';
import axios from '../../api/index';

import { render } from '../test-utils';
import { capitalize, extractIdFromUrl } from '../../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_POKEMON: jest.fn(),
  POKEMON_ART_BASE_URL: (id: number) => `url/${id}`,
}));

const mockedAxios = (axios as unknown) as jest.Mock;

describe('Pokemon', () => {
  const { pokemon } = data;

  beforeEach(() => {
    mockedAxios.mockImplementationOnce(() => (
      Promise.resolve({ data: pokemon })
    ));
  });

  it('Should fetch pokemon types from an external api and show them on screen', async () => {
    render(<Pokemon />, { initialRoute: '/pokemon/4' });

    await waitFor(() => {
      screen.getByText(capitalize(pokemon.name));
      screen.getByText(`${pokemon.height} Hectograms`);
      for (let i = 0; i < pokemon.types.length; i += 1) {
        const type = pokemon.types[i];
        const elem = screen.getByText(`${capitalize(type.type.name)}`);
        const id = extractIdFromUrl('/type', type.type.url);
        expect(elem.closest('a')!.getAttribute('href')).toEqual(`/?type=${id}`);
      }

      for (let i = 0; i < pokemon.stats.length; i += 1) {
        const stat = pokemon.stats[i];
        screen.getByText(`${capitalize(stat.stat.name)}`);
        screen.getByText(`${stat.base_stat}`);
      }
    });
  });
});
