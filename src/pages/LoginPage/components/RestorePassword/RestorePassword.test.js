import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import RestorePassword from './RestorePassword';
import configureStore from '../../../../configureStore';
import {BrowserRouter} from 'react-router-dom';

const store = configureStore({});

describe('RestorePassword:', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Provider store={store}>
				<BrowserRouter>
					<RestorePassword />
				</BrowserRouter>
			</Provider>,
			div);
		ReactDOM.unmountComponentAtNode(div);
	});

	// рендерим компонент
	const renderedComponent = mount(
		<BrowserRouter>
			<RestorePassword />
		</BrowserRouter>
	);

	// получаем его коллекцию классов
	const classes = {};
	for (let key in renderedComponent.find('RestorePassword').props().classes) {
		classes[key] = '.' + renderedComponent.find('RestorePassword').props().classes[key]
	}

	// проверки на присутствие нужных элементов

	it('Component have a title', () => {
		expect(renderedComponent.find(classes.title).length).to.equal(1);
	});

	it('Component have field of sending email', () => {
		expect(renderedComponent.find('Input#email').length).to.equal(1);
	});

	it('Component have submit button', () => {
		expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
	});

});