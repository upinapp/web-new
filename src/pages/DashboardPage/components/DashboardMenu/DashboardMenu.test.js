import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import DashboardMenu from './DashboardMenu';
import configureStore from '../../../../configureStore';

const store = configureStore({});

describe('DashboardMenu:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardMenu/>
        </BrowserRouter>
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });
});