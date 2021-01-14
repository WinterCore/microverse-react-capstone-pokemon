import React                            from 'react';
import classnames                       from 'classnames';
import { bindActionCreators, Dispatch } from 'redux';
import { connect }                      from 'react-redux';

import { SortFilter }   from '../store/filter/index';
import { changeSort }   from '../store/filter/actions';
import { InitialState } from '../store/root';

import utilStyles from '../utility.module.css';

const PokemonSort: React.FC<PokemonSortProps> = ({ changeSort, filter }) => {
    const handleSortFilterChange =
        (e: React.ChangeEvent<HTMLSelectElement>) => changeSort(+e.target.value);

    return (
        <div className={ classnames(utilStyles.ml1, utilStyles.mb3) }>
            <span className={ classnames(utilStyles.mr2, utilStyles.bold) }>Sort</span>
            <select data-testid="sortSelect" onChange={ handleSortFilterChange } className={ utilStyles.select } value={ filter }>
                <option value={ SortFilter.Default }>Default</option>
                <option value={ SortFilter.Asc }>Ascending (A-Z)</option>
                <option value={ SortFilter.Desc }>Descending (Z-A)</option>
            </select>
        </div>
    );
};


type Props = {};

type StateProps = { filter: SortFilter };

type DispatchProps = { changeSort: (sort: SortFilter) => void };

type PokemonSortProps = Props & StateProps & DispatchProps;

const mapStateToProps = (state: InitialState) => ({ filter: state.filter.sort });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ changeSort }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonSort);
