import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount  } from 'enzyme';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import SignIn from './SignIn';
import configureStore from '../../../../configureStore';

const store = configureStore({});

describe('SignIn:', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Provider store={store}>
				<BrowserRouter>
					<SignIn />
				</BrowserRouter>
			</Provider>,
			div);
		ReactDOM.unmountComponentAtNode(div);
	});


	// рендерим компонент
	const renderedComponent = mount(
		<BrowserRouter>
			<SignIn />
		</BrowserRouter>
	);

	// получаем его коллекцию классов
	const classes = {};
	for (let key in renderedComponent.find('SignIn').props().classes) {
		classes[key] = '.' + renderedComponent.find('SignIn').props().classes[key]
	}

	// проверки на присутствие нужных элементов

	it('Component have a title', () => {
		expect(renderedComponent.find(classes.title).length).to.equal(1);
	});

	it('Component have field for insert password', () => {
		expect(renderedComponent.find('Input[name="password"]').length).to.equal(1);
	});

	it('Component have field for insert email', () => {
		expect(renderedComponent.find('Input[name="email"]').length).to.equal(1);
	});

	it('Component have button for log in with google account', () => {
		expect(renderedComponent.find(classes.signInWithGoogle).length).to.equal(1);
	});

	it('Component have submit button', () => {
		expect(renderedComponent.find('Button' + classes.submitButton).length).to.equal(1);
	});

});