import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import DashboardPage from './DashboardPage';
import configureStore from '../../configureStore';

const store = configureStore({});

describe('DashboardPage:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
});