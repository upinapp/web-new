import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import {SignIn} from './SignIn';
import configureStore from '../../../../configureStore';

configure({adapter: new Adapter()});

const store = configureStore({});

let renderedComponent;

beforeEach(() => {
  renderedComponent = shallow(
    <SignIn/>
  );
});

describe('SignIn:', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn/>
        </BrowserRouter>
      </Provider>,
      div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // проверки на присутствие нужных элементов
  it('Component should a title', () => {
    expect(renderedComponent.find('.login-page__component__title').length).to.equal(1);
  });

  it('Component should field for insert email', () => {
    expect(renderedComponent.find('UiInput[name="email"]').length).to.equal(1);
  });

  it('Component should field for insert password', () => {
    expect(renderedComponent.find('UiInput[name="password"]').length).to.equal(1);
  });

  it('Component should button for log in with google account', () => {
    expect(renderedComponent.find('.login-page__component__sign-in-with-google').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('.login-page__component__submit-field').length).to.equal(1);
  });

});
