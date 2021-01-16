import React from 'react';
import { screen } from '@testing-library/react';

import Filter from '../../components/filter';
import { GetPokemonTypesResponse } from '../../api/responses';
import * as data from '../pokmeon-data';
import axios from '../../api/index';

import { render } from '../test-utils';
import { extractIdFromUrl } from '../../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_TYPES: jest.fn(),
}));

const mockedAxios = (axios as unknown) as jest.Mock;

describe('Filter', () => {
  const dummyData: GetPokemonTypesResponse = data.paginatedResponse(
    data.pokemonTypesResponse,
  );

  beforeEach(() => {
    mockedAxios.mockImplementationOnce(() => (
      Promise.resolve({ data: dummyData })
    ));
  });

  it('Should fetch pokemon types from an external api and show them on screen', async () => {
    render(<Filter />);

    const elem = await screen.findByText('All');
    expect(elem).toBeInTheDocument();
    for (let i = 0; i < dummyData.results.length; i += 1) {
      const item = dummyData.results[i];
      const filterItem = screen.getByText(item.name);
      expect(filterItem).toBeInTheDocument();
      const id = extractIdFromUrl('/type', item.url);
      expect(filterItem.closest('a')!.getAttribute('href')).toEqual(`/?type=${id}`);
    }
  });
});
