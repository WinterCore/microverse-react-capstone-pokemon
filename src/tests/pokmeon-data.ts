import { PaginatedResource, Pokemon } from '../api/models';

export const pokemon: Pokemon = {
    id     : 1,
    name   : 'test',
    height : 15,
    types  : [{ type: { name: 'testype', url: 'what' } }],
    stats  : [{ base_stat: 15, stat: { name: 'stat' } }]
};

export const paginatedResponse = <T>(data: T): PaginatedResource<T> => {
    return {
        count    : 20,
        next     : null,
        previous : null,
        results  : data
    };
};
