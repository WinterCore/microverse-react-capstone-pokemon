import React       from 'react';
import { connect } from 'react-redux';
import classnames  from 'classnames';

import Header      from '../../components/header';
import PokemonGrid from '../../components/pokemon-grid';
import Filter      from '../../components/filter';

import styles     from './index.module.css';
import utilStyles from '../../utility.module.css';

const Index: React.FC = (props) => {
    return (
        <>
            <Header />
            <div className={ styles.wideBannerSection }>
            </div>
            <main className={ utilStyles.main }>
                <div className={ classnames(utilStyles.mainContent, utilStyles.container, styles.mainContainer) }>
                    <div className={ utilStyles.mr3 }><PokemonGrid /></div>
                    <div className={ styles.filterCotnainer }>
                        <Filter />
                    </div>
                </div>
            </main>
        </>
    );
};

export default connect(state => state)(Index);
