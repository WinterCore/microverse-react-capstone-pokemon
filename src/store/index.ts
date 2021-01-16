import { createBrowserHistory } from 'history';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import reduxThunk from 'redux-thunk';

import createRootReducer, { AppInitialState } from './root';

export const history = createBrowserHistory();

const configureStore = (preloadedState: AppInitialState) => createStore(
  createRootReducer(history),
  preloadedState,
  compose(applyMiddleware(routerMiddleware(history), reduxThunk)),
);

export default configureStore;
