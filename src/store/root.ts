import { combineReducers } from 'redux';
import { connectRouter, RouterRootState } from 'connected-react-router';
import { History } from 'history';

import pokemon, {
  PokemonState,
  INITIAL_STATE as POKEMON_INITIAL_STATE,
} from './pokemon/index';

import pokemonTypes, {
  PokemonTypesState,
  INITIAL_STATE as POKEMON_TYPES_INITIAL_STATE,
} from './pokemon-types/index';

import pokemonType, {
  PokemonTypeState,
  INITIAL_STATE as POKEMON_TYPE_INITIAL_STATE,
} from './pokemon-type/index';

import filter, {
  FilterState,
  INITIAL_STATE as FILTER_INITIAL_STATE,
} from './filter/index';

export type AppInitialState = {
  pokemon: PokemonState;
  pokemonTypes: PokemonTypesState;
  pokemonType: PokemonTypeState;
  filter: FilterState;
};

export type InitialState = AppInitialState & RouterRootState;

export const INITIAL_STATE: AppInitialState = {
  pokemon: POKEMON_INITIAL_STATE,
  pokemonTypes: POKEMON_TYPES_INITIAL_STATE,
  pokemonType: POKEMON_TYPE_INITIAL_STATE,
  filter: FILTER_INITIAL_STATE,
};

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  pokemonTypes,
  pokemonType,
  pokemon,
  filter,
});

export default createRootReducer;
