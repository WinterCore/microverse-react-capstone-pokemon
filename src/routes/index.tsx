import React       from 'react';
import classnames  from 'classnames';

import PokemonGrid from '../components/pokemon-grid';
import Filter      from '../components/filter';

import utilStyles from '../utility.module.css';

const Index: React.FC = () => {
    return (
        <main className={ utilStyles.main }>
            <div className={ classnames(utilStyles.mainContent, utilStyles.container, utilStyles.mainContainer) }>
                <div className={ utilStyles.mr3 }><PokemonGrid /></div>
                <div>
                    <Filter />
                </div>
            </div>
        </main>
    );
};

export default Index;
