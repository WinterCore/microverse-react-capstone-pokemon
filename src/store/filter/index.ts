import { AnyAction, Reducer } from 'redux';

import { CHANGE_SORT_FILTER, ActionUnion, SortFilter } from './actions';

export type FilterState = { sort: SortFilter };

export const INITIAL_STATE: FilterState = {
  sort: SortFilter.Default,
};

const filterReducer: Reducer<FilterState> = (
  state: FilterState = INITIAL_STATE,
  rawAction: AnyAction,
) => {
  const action = rawAction as ActionUnion;
  switch (action.type) {
    case CHANGE_SORT_FILTER:
      return { sort: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
