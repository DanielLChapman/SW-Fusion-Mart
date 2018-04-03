import React from 'react';
import Router from "../../components/Router";
import { App }  from "../../components/App";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';

import {monsters} from '../../monsters';
import {cart} from '../CartExample';

const store = createStore(rootReducer)

function setup() {
	const props = {
		cart: {},
		incrementInCart: jest.fn(),
		decrementInCart: jest.fn(),
		removeFromCart: jest.fn(),
		initializeCart: jest.fn()
	}

	const enzymeWrapper = mount(
		<Provider store={store}>
			<MemoryRouter initialEntries={['/']} >
				<App {...props}/>
			</MemoryRouter>
		</Provider>
	);

	const wrapper = shallow(<App {...props} store={store} />);
	//console.log(wrapper.find('Header').dive().debug());

	return {props,enzymeWrapper, wrapper}

}


describe('App Component', () => {
	it('Containers a header component', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('Header')['length']).toBe(1);
	});
	it('Header component should have a information section on App', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(enzymeWrapper.find('.information').length).toBe(1);
	})
	it('Contains 16 monsters', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('Monster')['length']).toBe(16);
	});
	it('Contains a ul', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('ul')['length']).toBe(1);
	});
}) 

describe('App component with a cart', () => {
	beforeEach(function() {
		const props = {
			cart,
			incrementInCart: jest.fn(),
			decrementInCart: jest.fn(),
			removeFromCart: jest.fn(),
			initializeCart: jest.fn()
		}

		const enzymeWrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']} >
					<App {...props}/>
				</MemoryRouter>
			</Provider>
		);

		const wrapper = shallow(<App {...props} store={store} />);
	})

	it ('does something', () => {

	});
})
