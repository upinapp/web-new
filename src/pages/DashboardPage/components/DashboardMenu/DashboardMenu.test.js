import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import DashboardMenu from './DashboardMenu';
import configureStore from '../../../../configureStore';

const store = configureStore({});

describe('DashboardMenu:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <DashboardMenu />
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  })
});