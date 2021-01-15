import { createMatchSelector, RouterRootState } from 'connected-react-router';
import PropTypes                                from 'prop-types';
import React                                    from 'react';
import { bindActionCreators, Dispatch }         from 'redux';
import { connect }                              from 'react-redux';
import { Link, match }                          from 'react-router-dom';

import { PokemonState } from '../store/pokemon/index';
import { fetch }        from '../store/pokemon/actions';
import { InitialState } from '../store/root';

import ApiResourceRenderer from './api-resource-renderer';

import { POKEMON_ART_BASE_URL } from '../api';

import { extractIdFromUrl, capitalize } from '../utils';

import styles     from './pokemon.module.css';
import utilStyles from '../utility.module.css';

const Pokemon: React.FC<PokemonProps> = ({ pokemon: { data } }) => {
    const { id, name, types, height, stats } = data!;

    return (
        <div className={ styles.container }>
            <div className={ styles.imageContainer }>
                <img alt={ name } src={ POKEMON_ART_BASE_URL(id) } />
            </div>
            <div className={ styles.contentContainer }>
                <h1>{ capitalize(name) }</h1>
                <div className={ styles.contentSection }>
                    <h3>Height</h3>
                    <div>
                        { height } Hectograms
                    </div>
                </div>
                <div className={ styles.contentSection }>
                    <h3>Stats</h3>
                    <div>
                        {
                            stats.map(({ base_stat, stat: { name } }, i) => (
                                <div key={ i } className={ utilStyles.definition }>
                                    <span>{ capitalize(name) }</span><span>{ base_stat }</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={ styles.contentSection }>
                    <h3>Types</h3>
                    <div>
                        {
                            types.map(({ type }, i) => (
                                <Link key={ i } to={ `/?type=${extractIdFromUrl('/type', type.url)}` } className={ utilStyles.badge }>
                                    { capitalize(type.name) }
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

Pokemon.propTypes = {
    pokemon: PropTypes.shape({
        isLoading : PropTypes.bool.isRequired,
        error     : PropTypes.string,
        data      : PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            height: PropTypes.number.isRequired,
            types: PropTypes.arrayOf(PropTypes.any).isRequired,
            stats: PropTypes.arrayOf(PropTypes.any).isRequired,
        }),
    }).isRequired
};

const PokemonRenderer: React.FC<PokemonProps> = (props) => {
    const { pokemon: { isLoading, error, data }, fetch, match } = props;
    const id = match ? +match.params.id : -1;

    React.useEffect(() => fetch(id), [id, fetch]);

    return (
        <ApiResourceRenderer
            isLoading={ isLoading || !data }
            loaderWidth="300px"
            error={ error }
            empty={ false }
            render={() => <Pokemon { ...props } />}
        />
    );
};


type Props = {};

type StateProps = RouterRootState & {
    pokemon : PokemonState;
    match   : match<{ id: string }> | null;
};

type DispatchProps = {
    fetch: (id: number) => void;
};

type PokemonProps = Props & StateProps & DispatchProps;

const mapStateToProps = (state: InitialState) => {
    const matchSelector = createMatchSelector<RouterRootState, { id: string }>('/pokemon/:id');

    return ({
        pokemon : state.pokemon,
        router  : state.router,
        match   : matchSelector(state),
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetch }, dispatch);

PokemonRenderer.propTypes = {
    fetch   : PropTypes.func.isRequired,
    pokemon : Pokemon.propTypes.pokemon,
    match   : PropTypes.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonRenderer);
