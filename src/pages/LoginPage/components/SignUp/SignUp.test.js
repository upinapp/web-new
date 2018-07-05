import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import jest from 'jest';
import { configure, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { SignUp } from './SignUp';
import { store } from '../../../../utils';

configure({ adapter: new Adapter() });

const translateMock = (val) => 'mockValue';

let renderedComponent;

beforeEach(() => {
  renderedComponent = shallow(
    <SignUp translate={translateMock} />
  );
});

describe('SignUp:', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp translate={translateMock} />
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
    expect(renderedComponent.find('UiInput[name="name"]').length).to.equal(1);
  });

  it('Component should field for insert email', () => {
    expect(renderedComponent.find('UiInput[name="email"]').length).to.equal(1);
  });

  it('Component should field for insert password', () => {
    expect(renderedComponent.find('UiInput[name="password"]').length).to.equal(1);
  });

  it('Component should privacy', () => {
    expect(renderedComponent.find('.login-page__component__privacy').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('UiButton[type="submit"]').length).to.equal(1);
  });

});
