import { screen, waitFor }  from '@testing-library/react';

import Pokemon                from '../../components/pokemon';
import { GetPokemonResponse } from '../../api/responses';
import * as data              from '../pokmeon-data';
import axios                  from '../../api/index';

import { render }                       from '../test-utils';
import { capitalize, extractIdFromUrl } from '../../utils';

jest.mock('../../api/index', () => ({
    __esModule           : true,
    default              : jest.fn(),
    GET_POKEMON          : jest.fn(),
    POKEMON_ART_BASE_URL : (id: number) => `url/${id}`
}));

const mockedAxios = axios as unknown as jest.Mock;


describe('Pokemon', () => {
    const pokemon: GetPokemonResponse = data.pokemon;

    beforeEach(() => {
        mockedAxios.mockImplementationOnce(() => Promise.resolve({ data: pokemon }));
    });

    it('Should fetch pokemon types from an external api and show them on screen', async () => {
        render(<Pokemon />);

        await waitFor(() => {
            screen.getByText(capitalize(pokemon.name));
            screen.getByText(`${pokemon.height} Hectograms`);
            for (let type of pokemon.types) {
                const elem = screen.getByText(`${capitalize(type.type.name)}`);
                const id = extractIdFromUrl('/type', type.type.url);
                expect(elem.closest('a')!.getAttribute('href')).toEqual(`/?type=${id}`);
            }

            for (let stat of pokemon.stats) {
                screen.getByText(`${capitalize(stat.stat.name)}`);
                screen.getByText(`${stat.base_stat}`);
            }
        });
    });
});
