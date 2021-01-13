import * as actions                                              from '../../store/pokemon-types/actions';
import reducer, { INITIAL_STATE as POKEMON_TYPES_INITIAL_STATE } from '../../store/pokemon-types/index';

import axios             from '../../api/index';
import * as data         from '../pokmeon-data';
import { INITIAL_STATE } from '../../store/root';

import { mockStore }    from '../test-utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
    __esModule: true,
    default: jest.fn(),
    GET_TYPES: jest.fn(),
}));

const mockedAxios = axios as unknown as jest.Mock;

describe('Pokmon Types Store', () => {
    describe('Pokemon Types Actions', () => {
        it(`Should create ${actions.FETCH_POKEMON_TYPES_SUCCESS} and ${actions.FETCH_POKEMON_TYPES_ERROR} when fetching pokemon types succeeds`, async () => {

            const fetchedData = data.paginatedResponse(data.pokemonTypesResponse);

            mockedAxios.mockResolvedValueOnce({ data: fetchedData });

            const expectedActions: actions.ActionUnion[] = [
                { type: actions.FETCH_POKEMON_TYPES },
                { type: actions.FETCH_POKEMON_TYPES_SUCCESS, payload: data.paginatedResponse(data.pokemonTypesResource) },
            ];

            const store = mockStore(INITIAL_STATE);

            await store.dispatch(actions.fetch());

            expect(store.getActions()).toEqual(expectedActions);
        });

        it(`Should create ${actions.FETCH_POKEMON_TYPES} and ${actions.FETCH_POKEMON_TYPES_ERROR} when fetching types fails`, async () => {

            mockedAxios.mockRejectedValueOnce(new Error());

            const expectedActions: actions.ActionUnion[] = [
                { type: actions.FETCH_POKEMON_TYPES },
                { type: actions.FETCH_POKEMON_TYPES_ERROR, payload: 'Something happened' },
            ];

            const store = mockStore(INITIAL_STATE);

            await store.dispatch(actions.fetch());

            expect(store.getActions()).toEqual(expectedActions);

        });
    });

    describe('Pokemon Reducer', () => {
        it('Should return the initial state', () => {
            const state = reducer(undefined, { type: 'POTATO' });

            expect(state).toEqual(POKEMON_TYPES_INITIAL_STATE);
        });

        it(`Should handle ${actions.FETCH_POKEMON_TYPES}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON_TYPES, undefined));

            expect(state).toEqual({ data: null, isLoading: true, error: null });
        });

        it(`Should handle ${actions.FETCH_POKEMON_TYPES_SUCCESS}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON_TYPES_SUCCESS, data.pokemon));

            expect(state).toEqual({ data: data.pokemon, isLoading: false, error: null });
        });

        it(`Should handle ${actions.FETCH_POKEMON_TYPES_ERROR}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON_TYPES_ERROR, 'error'));

            expect(state).toEqual({ data: null, isLoading: false, error: 'error' });
        });
    });
});


