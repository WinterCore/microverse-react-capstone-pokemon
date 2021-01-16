import { createAction } from '../utils';

export enum SortFilter {
  Default,
  Asc,
  Desc,
}

export const CHANGE_SORT_FILTER = 'CHANGE_FILTER';

export type ChangeFilter = {
  type: typeof CHANGE_SORT_FILTER;
  payload: SortFilter;
};

export type ActionUnion = ChangeFilter;

export const changeSort = (sort: SortFilter) => (
  createAction<typeof CHANGE_SORT_FILTER, SortFilter>(CHANGE_SORT_FILTER, sort)
);
