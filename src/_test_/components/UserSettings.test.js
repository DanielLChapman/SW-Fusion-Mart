import React from 'react';
import Router from "../../components/Router";
import { UserSettings }  from "../../components/UserSettings";
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
			userSettings: {},
			initializeUserSettings: jest.fn(),
			incrementSettings: jest.fn(),
			decrementSettings: jest.fn(),
			setSettings: jest.fn(),
			resetSettings: jest.fn(),
			saveSettings: jest.fn()
		}

		enzymeWrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']} >
					<UserSettings {...props}/>
				</MemoryRouter>
			</Provider>
		);

		wrapper = shallow(<UserSettings {...props} store={store} />);
	
	});

	it ('does have a header', () => {
		expect(wrapper.find('Header').length).toBe(1);
	});
	it ('does have 2 buttons for saving and resetting', () => {
		expect(wrapper.find('button').length).toBe(2);
	});
	it ('does expect the buttons to trigger props', () => {
		let resetButton = wrapper.find('.reset-button');
		let saveButton = wrapper.find('.save-button');
		window.confirm = jest.fn(() => true)
		resetButton.simulate('click');
		expect(props.resetSettings).toBeCalled();
		saveButton.simulate('click');
		expect(props.saveSettings).toBeCalled();
	});
	it ('does have instruction setting in h3', () => {
		expect(wrapper.find('h3').length).toBe(1);
	});
	it ('does have 3 tables', () => {
		expect(wrapper.find('table').length).toBe(3);
	});


}) 

