import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import App from './App';
import configureStore from "./configureStore";

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

describe('App:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
});
