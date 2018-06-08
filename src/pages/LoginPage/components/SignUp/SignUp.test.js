import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from './SignUp';
import configureStore from '../../../../configureStore';

configure({adapter: new Adapter()});

const store = configureStore({});

let renderedComponent;

beforeEach(() => {
  renderedComponent = shallow(
    <SignUp/>
  );
});

describe('SignUp:', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp/>
        </BrowserRouter>
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // проверки на присутствие нужных элементов

  it('Component should a title', () => {
    expect(renderedComponent.find('.login-page__component__title').length).to.equal(1);
  });

  it('Component should field for insert name', () => {
    expect(renderedComponent.find('WithStyles(Input)[name="name"]').length).to.equal(1);
  });

  it('Component should field for insert email', () => {
    expect(renderedComponent.find('WithStyles(Input)[name="email"]').length).to.equal(1);
  });

  it('Component should field for insert password', () => {
    expect(renderedComponent.find('WithStyles(Input)[name="password"]').length).to.equal(1);
  });

  it('Component should privacy', () => {
    expect(renderedComponent.find('.login-page__component__privacy').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('.login-page__component__submit-field').length).to.equal(1);
  });

});