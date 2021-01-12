import { Provider }        from 'react-redux';
import { Route, Switch }   from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store/index';
import { INITIAL_STATE }           from './store/root';

import Index from './routes/index';

const store = configureStore(INITIAL_STATE);

const App = () => (
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <Switch>
                <Route exact path='/' component={ Index } />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default App;
