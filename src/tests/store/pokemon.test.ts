import * as actions                                        from '../../store/pokemon/actions';
import reducer, { INITIAL_STATE as POKEMON_INITIAL_STATE } from '../../store/pokemon/index';

import axios             from '../../api/index';
import * as data         from '../pokmeon-data';
import { INITIAL_STATE } from '../../store/root';

import { mockStore }    from '../test-utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
    __esModule: true,
    default: jest.fn(),
    GET_POKEMON: jest.fn(),
}));

const mockedAxios = axios as unknown as jest.Mock;

describe('Pokmon Store', () => {
    describe('Pokemon Actions', () => {
        it(`Should create ${actions.FETCH_POKEMON_SUCCESS} and ${actions.FETCH_POKEMON_ERROR} when fetching a pokemon succeeds`, async () => {

            mockedAxios.mockResolvedValueOnce({ data: data.pokemon });

            const expectedActions: actions.ActionUnion[] = [
                { type: actions.FETCH_POKEMON },
                { type: actions.FETCH_POKEMON_SUCCESS, payload: data.pokemon },
            ];

            const store = mockStore(INITIAL_STATE);

            await store.dispatch(actions.fetch(1));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it(`Should create ${actions.FETCH_POKEMON} and ${actions.FETCH_POKEMON_ERROR} when fetching types fails`, async () => {

            mockedAxios.mockRejectedValueOnce(new Error());

            const expectedActions: actions.ActionUnion[] = [
                { type: actions.FETCH_POKEMON },
                { type: actions.FETCH_POKEMON_ERROR, payload: 'Something happened' },
            ];

            const store = mockStore(INITIAL_STATE);

            await store.dispatch(actions.fetch(1));

            expect(store.getActions()).toEqual(expectedActions);

        });
    });

    describe('Pokemon Reducer', () => {
        it('Should return the initial state', () => {
            const state = reducer(undefined, { type: 'POTATO' });

            expect(state).toEqual(POKEMON_INITIAL_STATE);
        });

        it(`Should handle ${actions.FETCH_POKEMON}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON, undefined));

            expect(state).toEqual({ data: null, isLoading: true, error: null });
        });

        it(`Should handle ${actions.FETCH_POKEMON_SUCCESS}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON_SUCCESS, data.pokemon));

            expect(state).toEqual({ data: data.pokemon, isLoading: false, error: null });
        });

        it(`Should handle ${actions.FETCH_POKEMON_ERROR}`, () => {
            const state = reducer(undefined, createAction(actions.FETCH_POKEMON_ERROR, 'error'));

            expect(state).toEqual({ data: null, isLoading: false, error: 'error' });
        });
    });
});


