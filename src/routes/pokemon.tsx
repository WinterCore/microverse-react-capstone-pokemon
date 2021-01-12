import React from 'react';
import classnames from 'classnames';

import utilStyles from '../utility.module.css';

const Pokemon: React.FC = () => {
    return (
        <main className={ utilStyles.main }>
            <div className={ classnames(utilStyles.mainContent, utilStyles.container, utilStyles.mainContainer) }>
            </div>
        </main>
    );
};


export default Pokemon;
