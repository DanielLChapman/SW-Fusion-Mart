import React from 'react';
import Router from "../../components/Router";
import { Cart }  from "../../components/Cart";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';


const store = createStore(rootReducer)

var props, enzymeWrapper, wrapper;

describe('Cart Component', () => {
	beforeEach(function() {
		props = {
			cart: {},
			incrementInCart: jest.fn(),
			decrementInCart: jest.fn(),
			removeFromCart: jest.fn(),
			initializeCart: jest.fn(),
			setInCart: jest.fn()
		}

		enzymeWrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']} >
					<Cart {...props}/>
				</MemoryRouter>
			</Provider>
		);

		wrapper = shallow(<Cart {...props} store={store} />);

	});

	it('does contain header ', () => {
		expect(wrapper.find('Header').length).toBe(1);
	});
	it('does contain a mini cart ', () => {
		expect(wrapper.find('Connect(MiniCart)').length).toBe(1);
	});
	it('does contain a Total Amount ', () => {
		expect(wrapper.find('h3').length).toBe(1);
	});
	it('does contain a cart-right-hand ', () => {
		expect(wrapper.find('.cart-right-hand').length).toBe(1);
	});
	it('does contain a cart-display ', () => {
		expect(wrapper.find('.cart-display').length).toBe(1);
	});
	

});

