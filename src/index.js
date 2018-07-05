import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './utils';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </LocalizeProvider>
  </Provider>,
  MOUNT_NODE
);
registerServiceWorker();
