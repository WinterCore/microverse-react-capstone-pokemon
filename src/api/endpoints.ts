import { AxiosRequestConfig } from 'axios';

type ARC = AxiosRequestConfig;

export const API_URL = 'https://pokeapi.co/api/v2';

export const POKEMON_ART_BASE_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const GET_TYPES = (): ARC => ({ method: 'GET', url: '/type' });
export const GET_TYPE = (id: number): ARC => ({
  method: 'GET',
  url: `/type/${id}`,
});

export const GET_POKEMON = (id: number): ARC => ({
  method: 'GET',
  url: `/pokemon/${id}`,
});
export const GET_POKEMONS = (): ARC => ({ method: 'GET', url: '/pokemon' });
