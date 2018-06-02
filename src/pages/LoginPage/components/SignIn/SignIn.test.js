import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './SignIn';
import configureStore from '../../../../configureStore';

configure({adapter: new Adapter()});

const store = configureStore({});

let renderedComponent;
const classes = {};

beforeEach(function () {
  // рендерим компонент
  renderedComponent = mount(
    <BrowserRouter>
      <SignIn/>
    </BrowserRouter>
  );

  // получаем его коллекцию классов
  for (let key in renderedComponent.find('SignIn').props().classes) {
    classes[key] = '.' + renderedComponent.find('SignIn').props().classes[key];
  }
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
    expect(renderedComponent.find(classes.title).length).to.equal(1);
  });

  it('Component should field for insert password', () => {
    expect(renderedComponent.find('Input[name="password"]').length).to.equal(1);
  });

  it('Component should field for insert email', () => {
    expect(renderedComponent.find('Input[name="email"]').length).to.equal(1);
  });

  it('Component should button for log in with google account', () => {
    expect(renderedComponent.find(classes.signInWithGoogle).length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
  });

});

// let hello;
// beforeEach(function () {
//   hello = 'hi';
// });
//
// afterEach(function () {
//   console.log(hello);
// });
//
// describe('context', () => {
//   it('should work', function () {
//     console.log(hello);
//   });
// });
//
