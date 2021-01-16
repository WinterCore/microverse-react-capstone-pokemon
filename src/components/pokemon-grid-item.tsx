import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { POKEMON_ART_BASE_URL } from '../api';
import { NamedApiResource } from '../api/models';
import { capitalize } from '../utils';

import utilStyles from '../utility.module.css';

const PokemonGridItem: React.FC<PokemonGridItemProps> = ({ id, name }) => (
  <div className={utilStyles.card}>
    <h2 className={utilStyles.cardTitle}>{capitalize(name)}</h2>
    <img alt={name} src={POKEMON_ART_BASE_URL(id)} />
    <div
      className={classnames(
        utilStyles.cardFooter,
        utilStyles.flex,
        utilStyles.justifyCenter,
      )}
    >
      <Link to={`/pokemon/${id}`} className={utilStyles.button}>
        More Info
      </Link>
    </div>
  </div>
);

type PokemonGridItemProps = NamedApiResource & {};

PokemonGridItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(state => state)(PokemonGridItem);
