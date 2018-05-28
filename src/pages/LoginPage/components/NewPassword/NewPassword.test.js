import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, mount} from 'enzyme';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import NewPassword from './NewPassword';
import configureStore from '../../../../configureStore';

configure({adapter: new Adapter()});

const store = configureStore({});

let renderedComponent;
const classes = {};
beforeEach(() => {
  // рендерим компонент
  renderedComponent = mount(
    <NewPassword/>
  );

  // получаем его коллекцию классов
  for (let key in renderedComponent.find('NewPassword').props().classes) {
    classes[key] = '.' + renderedComponent.find('NewPassword').props().classes[key];
  }
  
});

describe('NewPassword:', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <NewPassword/>
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

  it('Component should field for insert confirm password', () => {
    expect(renderedComponent.find('Input[name="passwordConfirm"]').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
  });
});