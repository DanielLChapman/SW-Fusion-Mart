import React from 'react';
import Router from "../../components/Router";
import { MiniCart }  from "../../components/MiniCart";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';

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
}) 

