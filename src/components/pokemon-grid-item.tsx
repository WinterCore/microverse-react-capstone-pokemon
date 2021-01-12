import React       from 'react';
import classnames  from 'classnames';
import { connect } from 'react-redux';

import { POKEMON_ART_BASE_URL } from '../api';
import { NamedApiResource }     from '../api/models';
import { capitalize }           from '../utils';

import utilStyles from '../utility.module.css';

const PokemonGridItem: React.FC<PokemonGridItemProps> = ({ id, name }) => {
    return (
        <div className={ utilStyles.card }>
            <h2 className={ utilStyles.cardTitle }>{ capitalize(name) }</h2>
            <img alt={ name } src={ POKEMON_ART_BASE_URL(id) } />
            <div className={ classnames(utilStyles.cardFooter, utilStyles.flex, utilStyles.justifyCenter) }>
                <button className={ utilStyles.button }>More Info</button>
            </div>
        </div>
    );
};

type PokemonGridItemProps = NamedApiResource & {};

export default connect(state => state)(PokemonGridItem);
