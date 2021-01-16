import * as actions from '../../store/filter/actions';

import reducer, {
  INITIAL_STATE as FILTER_INITIAL_STATE,
} from '../../store/filter/index';

import { createAction } from '../../store/utils';

describe('Pokemon Filter Store', () => {
  describe('Pokemon Filter Actions', () => {
    it(`Should create ${actions.CHANGE_SORT_FILTER} when the sort filter changes`, () => {
      const expectedAction = createAction(
        actions.CHANGE_SORT_FILTER,
        actions.SortFilter.Asc,
      );

      expect(actions.changeSort(actions.SortFilter.Asc))
        .toEqual(expectedAction);
    });
  });

  describe('Pokemon Filter Reducer', () => {
    it('Should return the initial state', () => {
      const state = reducer(undefined, { type: 'POTATO' });

      expect(state).toEqual(FILTER_INITIAL_STATE);
    });

    it(`Should handle ${actions.CHANGE_SORT_FILTER}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.CHANGE_SORT_FILTER, actions.SortFilter.Asc),
      );

      expect(state).toEqual({ sort: actions.SortFilter.Asc });
    });
  });
});
