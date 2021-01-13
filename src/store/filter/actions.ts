import { createAction } from '../utils';

import { SortFilter } from './index';

export const CHANGE_SORT_FILTER = 'CHANGE_FILTER';

export type ChangeFilter = {
    type    : typeof CHANGE_SORT_FILTER;
    payload : SortFilter;
};

export type ActionUnion = ChangeFilter;

export const changeSort = (sort: SortFilter) => createAction<typeof CHANGE_SORT_FILTER, SortFilter>(CHANGE_SORT_FILTER, sort);
