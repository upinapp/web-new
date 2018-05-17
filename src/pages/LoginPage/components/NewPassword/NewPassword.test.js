import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import NewPassword from './NewPassword';
import configureStore from '../../../../configureStore';

const store = configureStore({});

describe('NewPassword:', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <NewPassword />
                </Provider>,
        div);
        ReactDOM.unmountComponentAtNode(div);
    });


    // рендерим компонент
    const renderedComponent = mount(
        <NewPassword />
    );

    // получаем его коллекцию классов
    const classes = {};
    for (let key in renderedComponent.find('NewPassword').props().classes) {
        classes[key] = '.' + renderedComponent.find('NewPassword').props().classes[key]
    }

    // проверки на присутствие нужных элементов

    it('Component have a title', () => {
        expect(renderedComponent.find(classes.title).length).to.equal(1);
    });

    it('Component have field for insert password', () => {
        expect(renderedComponent.find('Input[name="password"]').length).to.equal(1);
    });

    it('Component have field for insert confirm password', () => {
        expect(renderedComponent.find('Input[name="passwordConfirm"]').length).to.equal(1);
    });

    it('Component have submit button', () => {
        expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
    });

});