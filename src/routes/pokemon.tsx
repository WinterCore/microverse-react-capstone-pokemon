import React from 'react';
import classnames from 'classnames';

import PokemonView from '../components/pokemon';

import utilStyles from '../utility.module.css';

const Pokemon: React.FC = () => (
  <main className={utilStyles.main}>
    <div className={classnames(utilStyles.mainContent, utilStyles.container)}>
      <PokemonView />
    </div>
  </main>
);

export default Pokemon;
