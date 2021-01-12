export interface Action<T, S> {
    type    : T;
    payload : S;
};

export const createAction =
    <T, S>(type: T, payload: S): Action<T, S> => ({ type, payload });


export type ApiResourceState<T> = {
    isLoading : boolean;
    error     : string | null;
    data      : T | null;
};
