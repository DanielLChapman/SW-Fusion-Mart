import React from 'react';
import Router from "../../components/Router";
import { Checkout }  from "../../components/Checkout";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';

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


}) 

