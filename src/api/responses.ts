import { NamedApiResource } from './models';

export type PaginatedResponse = {
    count    : number;
    next     : null | string;
    previous : null | string;
};


export type GetTypesResponse = NamedApiResource;


