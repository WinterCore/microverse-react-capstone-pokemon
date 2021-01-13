import React      from 'react';
import classnames from 'classnames';
import { Link }   from 'react-router-dom';

import styles     from './header.module.css';
import utilStyles from '../utility.module.css';

import logo from '../assets/pokeball.png';

const Header: React.FC = () => {
    return (
        <header>
            <div className={ classnames(styles.descriptionBar, utilStyles.flex, utilStyles.justifyCenter) }>
                <div className={ classnames(utilStyles.container, styles.topHeader) }>
                    Welcome to Pokepedia, where you can view pokemon types and look at pokemons.
                    <Link
                        to="/"
                        className={ classnames(utilStyles.flex, utilStyles.column, utilStyles.justifyCenter, utilStyles.alignCenter, styles.sign) }
                    >
                        <img alt="logo" src={ logo } />
                        <div className={ styles.signText }>Pokepedia</div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
