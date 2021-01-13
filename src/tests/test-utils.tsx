import React                         from 'react';
import { render as rtlRender }       from '@testing-library/react';
import { Provider }                  from 'react-redux';
import { MemoryRouter }              from 'react-router-dom';
import configureMockStore            from 'redux-mock-store';
import ReduxThunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction }                 from 'redux';

import { AppInitialState, INITIAL_STATE } from '../store/root';
import createStore                        from '../store/index';

const render = (elem: React.ReactElement, { initialState = INITIAL_STATE, store = createStore(initialState), ...renderOptions } = {}) => {
    const Wrapper: React.FC = ({ children }) => (
        <MemoryRouter>
            <Provider store={ store }>{ children }</Provider>
        </MemoryRouter>
    );
    return rtlRender(elem, { wrapper: Wrapper, ...renderOptions });
};

type DispatchExts = ThunkDispatch<AppInitialState, void, AnyAction>;
const mockStore = configureMockStore<AppInitialState, DispatchExts>([ReduxThunk])

export { render, mockStore };
