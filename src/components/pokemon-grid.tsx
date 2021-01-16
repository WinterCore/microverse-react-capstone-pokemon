import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouterRootState } from 'connected-react-router';
import queryString from 'query-string';

import { PokemonTypeState } from '../store/pokemon-type/index';
import { fetch } from '../store/pokemon-type/actions';
import { InitialState } from '../store/root';
import { FilterState } from '../store/filter';

import PokemonGridItem from './pokemon-grid-item';
import ApiResourceRenderer from './api-resource-renderer';

import utilStyles from '../utility.module.css';
import { pokemonSorter } from '../utils';

const PokemonGrid: React.FC<PokemonGridProps> = ({
  type: { isLoading, data, error },
  fetchType,
  router,
  filter,
}) => {
  const type = (
    +(queryString.parse(router.location.search).type as string) || -1
  );

  React.useEffect(() => fetchType(type), [type, fetchType]);

  return (
    <ApiResourceRenderer
      isLoading={isLoading || !data}
      loaderWidth="300px"
      error={error}
      empty={!data || data.pokemon.length === 0}
      render={() => {
        const pokemons = pokemonSorter(
          data!.pokemon.slice(0, 20).map(x => x.pokemon),
          filter.sort,
        );

        return (
          <div data-testid="pokemonsGrid" className={utilStyles.itemsGrid}>
            {pokemons.map(pokemon => (
              <PokemonGridItem
                key={pokemon.id}
                name={pokemon.name}
                id={pokemon.id}
              />
            ))}
          </div>
        );
      }}
    />
  );
};

type Props = {};

type StateProps = RouterRootState & {
  type: PokemonTypeState;
};

type DispatchProps = {
  fetchType: (id: number) => void;
  filter: FilterState;
};

type PokemonGridProps = Props & StateProps & DispatchProps;

const mapStateToProps = (state: InitialState) => ({
  type: state.pokemonType,
  filter: state.filter,
  router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
  bindActionCreators({ fetchType: fetch }, dispatch)
);

PokemonGrid.propTypes = {
  fetchType: PropTypes.func.isRequired,
  filter: PropTypes.shape({ sort: PropTypes.number.isRequired }).isRequired,
  /* eslint-disable react/forbid-prop-types */
  router: PropTypes.any.isRequired,
  /* eslint-enable react/forbid-prop-types */
  type: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pokemon: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonGrid);
