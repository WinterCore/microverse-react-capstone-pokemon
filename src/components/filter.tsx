import React                            from 'react';
import classnames                       from 'classnames';
import { Link }                         from 'react-router-dom';
import { connect }                      from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouterRootState }              from 'connected-react-router';
import queryString                      from 'query-string';

import { NamedApiResource }  from '../api/models';
import { InitialState }      from '../store/root';
import { PokemonTypesState } from '../store/pokemon-types/index';
import { fetch }             from '../store/pokemon-types/actions';

import ApiResourceRenderer from './api-resource-renderer';

import styles     from './filter.module.css';
import utilStyles from '../utility.module.css';

const FilterItem: React.FC<FilterItemProps> = ({ id, name, active }) => {

    return (
        <Link
            to={ `/?${queryString.stringify({ type: id })}` }
            key={ id }
            className={ classnames(styles.listItem, { [styles.active]: active === id }) }
        >
            { name }
        </Link>
    );
};

type FilterItemProps = NamedApiResource & {
    active: number;
};

const Filter: React.FC<FilterProps> = ({ types: { isLoading, data, error }, fetchTypes, router }) => {
    React.useEffect(() => { fetchTypes() }, [fetchTypes]);

    const type = +(queryString.parse(router.location.search).type as string) || -1;

    return (
        <div>
            <h2 className={ classnames(utilStyles.bannerTitle, utilStyles.green) }>Types</h2>
            <ApiResourceRenderer
                isLoading={ isLoading }
                loaderWidth="50%"
                empty={ !data || data.results.length === 0 }
                error={ error }
                render={() => (
                    <div className={ styles.listContainer }>
                        {
                            [{ id: -1, name: 'All' }, ...data!.results]
                                .map((props) => <FilterItem key={ props.id } active={ type } { ...props } />)
                        }
                    </div>
                )}
            />
        </div>
    );
};

type Props = {};

type StateProps = RouterRootState & {
    types: PokemonTypesState;
};

type DispatchProps = {
    fetchTypes: () => void;
};

type FilterProps = Props & StateProps & DispatchProps;

const mapStateToProps = (state: InitialState) => {
    return ({
        types  : state.pokemonTypes,
        router : state.router,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchTypes: fetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
