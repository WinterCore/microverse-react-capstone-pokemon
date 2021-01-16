import Axios from 'axios';

import { API_URL } from './endpoints';

export * from './endpoints';

const api = Axios.create({
  baseURL: API_URL,
  headers: {},
});

export default api;
