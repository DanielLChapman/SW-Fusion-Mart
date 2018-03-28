import React from 'react';
import Router from "../../components/Router";
import { App }  from "../../components/App";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';

const store = createStore(rootReducer)

function setup() {
	const props = {
		cart: {},
		incrementInCart: jest.fn(),
		decrementInCart: jest.fn(),
		removeFromCart: jest.fn()
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
		//console.log(enzymeWrapper.find('App').html());
		expect(wrapper.find('Header')['length']).toBe(1);
		//console.log(wrapper.find('Header').dive().debug());
	});
	it('Header component should have a tag line on App', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(enzymeWrapper.find('.tagline').length).toBe(1);
	})
	it('Contains 16 monsters', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('Monster')['length']).toBe(16);
	});
	it('Contains a Mini Cart', () => {
		const {enzymeWrapper, wrapper} = setup();
		expect(wrapper.find('Connect(MiniCart)')['length']).toBe(1);
	})
}) 

