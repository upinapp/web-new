import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import {RestorePassword} from './RestorePassword';
import {BrowserRouter} from 'react-router-dom';
import { store } from '../../../../utils';

configure({adapter: new Adapter()});

let renderedComponent;
const classes = {};
beforeEach(() => {
  renderedComponent = shallow(
    <RestorePassword/>
  );
});

describe('RestorePassword:', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <RestorePassword/>
        </BrowserRouter>
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // проверки на присутствие нужных элементов
  it('Component should a title', () => {
    expect(renderedComponent.find('.login-page__component__title').length).to.equal(1);
  });

  it('Component should field of sending email', () => {
    expect(renderedComponent.find('WithStyles(Input)[name="email"]').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('.login-page__component__submit-field').length).to.equal(1);
  });

});
