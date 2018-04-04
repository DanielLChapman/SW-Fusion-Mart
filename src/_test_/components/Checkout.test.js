import React from 'react';
import Router from "../../components/Router";
import { Checkout }  from "../../components/Checkout";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';

import {monsters} from '../../monsters';
import {cart} from '../CartExample';
import {generateDefaultUserSettings} from '../UserSettingExample';

const store = createStore(rootReducer)

var props, enzymeWrapper, wrapper;

describe('Checkout Component', () => {
	beforeEach(function() {
		props = {
			cart: {},
			userSettings: {},
			initializeUserSettings: jest.fn(),
			initializeCart: jest.fn()
		}

		enzymeWrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']} >
					<Checkout {...props}/>
				</MemoryRouter>
			</Provider>
		);

		wrapper = shallow(<Checkout {...props} store={store} />);

	});

	it('does contain header ', () => {
		expect(wrapper.find('Header').length).toBe(1);
	});

	it('does contain a content header ', () => {
		expect(wrapper.find('.checkout-inner-display').length).toBe(1);
	});
	it('does contain 4 tables', () => {
		expect(wrapper.find('table').length).toBe(4);
	});
	it('does contain a button to switch 5 stars ', () => {
		expect(wrapper.find('button').length).toBe(1);
		let currentState = wrapper.state().ignore5Stars;
		wrapper.find('button').simulate('click');
		expect(wrapper.state().ignore5Stars).toBe(!currentState);
	});
	it('does contain a ul', () => {
		expect(wrapper.find('ul').length).toBe(1);
	});
	it('does contain 4 table-titles', () => {
		expect(wrapper.find('.table-title').length).toBe(4);
	})

}) 

describe('User Settings with Data', () => {
	beforeEach(function() {
		props = {
			cart,
			userSettings: generateDefaultUserSettings(),
			initializeUserSettings: jest.fn(),
			initializeCart: jest.fn()
		}

		enzymeWrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']} >
					<Checkout {...props}/>
				</MemoryRouter>
			</Provider>
		);

		wrapper = shallow(<Checkout {...props} store={store} />);

	});

	it('does contain data in the tables', () => {
		expect(wrapper.find('.cart-units').first().find('tr').length).toBe(3);
		const cartUnits = wrapper.find('.cart-units').first().find('tr').find('td').map(column => column.text());
		expect(cartUnits[2]).toBe("jeanne");

		expect(wrapper.find('.cart-essence').first().find('tr').length).toBe(7);
		const cartEssence = wrapper.find('.cart-essence').first().find('tr').find('td').map(column => column.text());
		expect(cartEssence[2]).toBe("20");

		expect(wrapper.find('.required-units').first().find('tr').length).toBe(6);
		const requiredUnits = wrapper.find('.required-units').first().find('tr').find('td').map(column => column.text());
		expect(requiredUnits[2]).toBe("loren");

		expect(wrapper.find('.required-essence').first().find('tr').length).toBe(7);
		const requiredEssence = wrapper.find('.required-essence').first().find('tr').find('td').map(column => column.text());
		expect(requiredEssence[2]).toBe("40");
	});

	it('does change the data if userSettings are changed', () => {
		let currentCart = parseInt(wrapper.find('.countOfCart').text(), 10);
		props.userSettings.four.kaz += 1;
		currentCart -= 1;
		const newWrapper = shallow(<Checkout {...props} store={store} />);
		let newCart = parseInt(newWrapper.find('.countOfCart').text(), 10);
		//Cart should descrease, a new li should be added in the ul for what was removed,
		//And required units should be removed;
		expect(newCart).toBe(currentCart);
		expect(newWrapper.find('li').length).toBe(1);
		expect(newWrapper.find('.required-units').first().find('tr').length).toBe(2);
	});
})
