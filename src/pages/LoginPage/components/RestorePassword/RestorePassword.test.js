import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {configure, mount} from 'enzyme';
import {Provider} from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import RestorePassword from './RestorePassword';
import configureStore from '../../../../configureStore';
import {BrowserRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

const store = configureStore({});

let renderedComponent;
const classes = {};
beforeEach(() => {
  // рендерим компонент
  renderedComponent = mount(
    <BrowserRouter>
      <RestorePassword/>
    </BrowserRouter>
  );

  // получаем его коллекцию классов
  for (let key in renderedComponent.find('RestorePassword').props().classes) {
    classes[key] = '.' + renderedComponent.find('RestorePassword').props().classes[key];
  }
})

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
    expect(renderedComponent.find(classes.title).length).to.equal(1);
  });

  it('Component should field of sending email', () => {
    expect(renderedComponent.find('Input#email').length).to.equal(1);
  });

  it('Component should submit button', () => {
    expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
  });

});