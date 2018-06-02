// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './App';
import configureStore from './configureStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE
);
registerServiceWorker();
