import * as actions from '../../store/pokemon-type/actions';
import reducer, {
  INITIAL_STATE as POKEMON_TYPES_INITIAL_STATE,
} from '../../store/pokemon-type/index';

import axios from '../../api/index';
import * as data from '../pokmeon-data';
import { INITIAL_STATE } from '../../store/root';

import { mockStore } from '../test-utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_TYPE: jest.fn(),
}));

const mockedAxios = (axios as unknown) as jest.Mock;

describe('Pokmon Type Store', () => {
  describe('Pokemon Type Actions', () => {
    it(`Should create ${actions.FETCH_POKEMON_TYPE_SUCCESS} and ${actions.FETCH_POKEMON_TYPE_ERROR} when fetching a pokemon type succeeds`, async () => {
      const fetchedData = data.pokemonTypeResponse;

      mockedAxios.mockResolvedValueOnce({ data: fetchedData });

      const expectedActions: actions.ActionUnion[] = [
        { type: actions.FETCH_POKEMON_TYPE },
        {
          type: actions.FETCH_POKEMON_TYPE_SUCCESS,
          payload: data.pokemonTypeResource,
        },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_POKEMON_TYPE} and ${actions.FETCH_POKEMON_TYPE_ERROR} when fetching types fails`, async () => {
      mockedAxios.mockRejectedValueOnce(new Error());

      const expectedActions: actions.ActionUnion[] = [
        { type: actions.FETCH_POKEMON_TYPE },
        {
          type: actions.FETCH_POKEMON_TYPE_ERROR,
          payload: 'Something happened',
        },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Pokemon Type Reducer', () => {
    it('Should return the initial state', () => {
      const state = reducer(undefined, { type: 'POTATO' });

      expect(state).toEqual(POKEMON_TYPES_INITIAL_STATE);
    });

    it(`Should handle ${actions.FETCH_POKEMON_TYPE}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_POKEMON_TYPE, undefined),
      );

      expect(state).toEqual({ data: null, isLoading: true, error: null });
    });

    it(`Should handle ${actions.FETCH_POKEMON_TYPE_SUCCESS}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_POKEMON_TYPE_SUCCESS, data.pokemon),
      );

      expect(state).toEqual({
        data: data.pokemon,
        isLoading: false,
        error: null,
      });
    });

    it(`Should handle ${actions.FETCH_POKEMON_TYPE_ERROR}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_POKEMON_TYPE_ERROR, 'error'),
      );

      expect(state).toEqual({ data: null, isLoading: false, error: 'error' });
    });
  });
});
