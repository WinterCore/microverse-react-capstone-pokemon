import React                            from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouterRootState }              from 'connected-react-router';
import queryString                      from 'query-string';

import { PokemonTypeState } from '../store/pokemon-type/index';
import { fetch }            from '../store/pokemon-type/actions';
import { InitialState }     from '../store/root';

import PokemonGridItem     from './pokemon-grid-item';
import ApiResourceRenderer from './api-resource-renderer';

import utilStyles from '../utility.module.css';

const PokemonGrid: React.FC<PokemonGridProps> = ({ type: { isLoading, data, error }, fetchType, router }) => {
    const type = +(queryString.parse(router.location.search).type as string) || -1;

    React.useEffect(() => fetchType(type), [type]);

    return (
        <ApiResourceRenderer
            isLoading={ isLoading || !data }
            loaderWidth="300px"
            error={ error }
            empty={ !data || data.pokemon.length === 0 }
            render={() => (
                <div className={ utilStyles.itemsGrid }>
                    { data!.pokemon.slice(0, 20).map(({ pokemon }) => <PokemonGridItem key={ pokemon.id } { ...pokemon } />) }
                </div>
            )}
        />
    );
};

type Props = {};

type StateProps = RouterRootState & {
    type: PokemonTypeState;
        };

type DispatchProps = {
    fetchType: (id: number) => void;
};

type PokemonGridProps = Props & StateProps & DispatchProps;

const mapStateToProps = (state: InitialState) => {
    return ({
        type   : state.pokemonType,
        router : state.router,
    });
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchType: fetch }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonGrid);
