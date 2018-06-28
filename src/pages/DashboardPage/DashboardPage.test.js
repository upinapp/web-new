import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../utils';

import DashboardPage from './DashboardPage';

describe('DashboardPage:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

