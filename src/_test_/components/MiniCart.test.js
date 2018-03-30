import React from 'react';
import Router from "../../components/Router";
import { MiniCart }  from "../../components/MiniCart";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';

import {monsters} from '../../monsters';
import {cart, cart2} from '../CartExample';

const store = createStore(rootReducer)

var wrapper, props;
describe('MiniCart Component', () => {
	beforeEach(function() {
		props = {
			cart: {},
			incrementInCart: jest.fn(),
			decrementInCart: jest.fn(),
			removeFromCart: jest.fn(),
			setInCart: jest.fn()
		}
		wrapper = shallow(<MiniCart {...props} store={store} />);
	});

	it('does have 2 links ', () => {
		expect(wrapper.find('Link').length).toBe(2);
	})
	it('does have 2 buttons', () => {
		expect(wrapper.find('button').length).toBe(2);
	})
	it('does have 1 ul', () => {
		expect(wrapper.find('ul').length).toBe(1);
	})
});

describe('MiniCart Component with an actual cart', () => {
	beforeEach(function() {
		props = {
			cart,
			incrementInCart: jest.fn(),
			decrementInCart: jest.fn(),
			removeFromCart: jest.fn(),
			setInCart: jest.fn()
		}
		wrapper = shallow(<MiniCart {...props} store={store} />);
	});

	it('expects for data to be in lis', () => {
		expect(wrapper.find('li').length).toBe(2);
	});

	it('expects the buttons to work', () => {
		wrapper.find('.increment').first().simulate('click');
		expect(props.incrementInCart).toBeCalled();

		wrapper.find('.decrement').first().simulate('click');
		expect(props.decrementInCart).toBeCalled();

		wrapper.find('.remove').first().simulate('click');
		expect(props.removeFromCart).toBeCalled();

		wrapper.find('.cart-input').first().simulate('change', {currentTarget: {value: 4}});
		expect(props.setInCart).toBeCalled();
	});

	it('sorts correctly', () => {
		props.cart = cart2;
		let wrapper2 = shallow(<MiniCart {...props} store={store} />);
		wrapper = wrapper.find('li').map(column => column.text().split(' '));
		wrapper2 = wrapper2.find('li').map(column => column.text().split(' '));
		expect(wrapper[0][0]).toBe(wrapper2[1][0]);
	})
})

