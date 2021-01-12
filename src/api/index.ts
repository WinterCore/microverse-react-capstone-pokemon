import Axios from "axios";

import { API_URL } from './endpoints';

export * from './endpoints';

const api = Axios.create({
    baseURL : API_URL,
    headers : {}
});

export const extractIdFromUrl = (urlType: string, str: string): number => {
    const idx = str.indexOf(urlType);
    const match  = /\/(?<id>\d+)\/?/.exec(str.slice(idx + urlType.length));
    if (!match || !match.groups) {
        return -1;
    }
    return +match.groups.id;
};

export default api;
