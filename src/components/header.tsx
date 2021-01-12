import React      from 'react';
import classnames from 'classnames';

import styles     from './header.module.css';
import utilStyles from '../utility.module.css';

import logo from '../assets/pokeball.png';

const Header: React.FC = () => {
    return (
        <header>
            <div className={ classnames(styles.descriptionBar, utilStyles.flex, utilStyles.justifyCenter) }>
                <div className={ classnames(utilStyles.container, styles.topHeader) }>
                    Welcome to Pokemonipedia, where you can view pokemon types and look at pokemons.
                    <div
                        className={ classnames(utilStyles.flex, utilStyles.column, utilStyles.justifyCenter, utilStyles.alignCenter, styles.sign) }
                    >
                        <img alt="logo" src={ logo } />
                        <div className={ styles.signText }>Pokipedia</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
