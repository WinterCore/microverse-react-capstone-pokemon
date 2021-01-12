import React       from 'react';
import classnames  from 'classnames';
import { connect } from 'react-redux';

import utilStyles from '../utility.module.css';

const Pokemon: React.FC = (props) => {
    return (
        <div className={ utilStyles.card }>
            <h2 className={ utilStyles.cardTitle }>Charazard</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" />
            <div className={ classnames(utilStyles.cardFooter, utilStyles.flex, utilStyles.justifyCenter) }>
                <button className={ utilStyles.button }>More Info</button>
            </div>
        </div>
    );
};

export default connect(state => state)(Pokemon);
