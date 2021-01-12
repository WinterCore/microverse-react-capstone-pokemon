import React from 'react';

import utilStyles from '../utility.module.css';

import PokemonGridItem from './pokemon-grid-item';

const PokemonGrid: React.FC = () => {
    return (
        <div className={ utilStyles.itemsGrid }>
            <PokemonGridItem />
        </div>
    );
};

export default PokemonGrid;
