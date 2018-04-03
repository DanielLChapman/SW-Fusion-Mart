import React from 'react';
import Router from "../../components/Router";
import { UserSettings }  from "../../components/UserSettings";
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, MemoryRouter } from "react-router-dom";
import rootReducer from '../../reducers';
import toJson from 'enzyme-to-json';

import {generateDefaultUserSettings} from '../UserSettingExample';

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
	it ('does have instruction setting in h2', () => {
		expect(wrapper.find('h3').length).toBe(3);
	});
	it ('does have 3 tables', () => {
		expect(wrapper.find('table').length).toBe(3);
	});


});

describe('User Settings with actual data', () => {
	beforeEach(function() {
		props = {
			userSettings: generateDefaultUserSettings(),
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
	it ('expects that the tables contain the correct data', () => {
		//7 essences (6 + header)
		expect(wrapper.find('.essence-table').first().find('tr').length).toBe(7);
		//11 4 stars + header = 12
		expect(wrapper.find('.four-star-table').first().find('tr').length).toBe(12);
		//49 2 and 3 stars + header
		expect(wrapper.find('.three-star-table').first().find('tr').length).toBe(50);
	});
	it('expects that the - + and set functions work', () => {
		wrapper.find('.incrementFour').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();
		wrapper.find('.incrementThree').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();
		wrapper.find('.incrementEssence').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();

		wrapper.find('.decrementFour').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();
		wrapper.find('.decrementThree').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();
		wrapper.find('.decrementEssence').first().simulate('click');
		expect(props.incrementSettings).toBeCalled();

		wrapper.find('.inputThree').first().simulate('change', {currentTarget: {value: '2'}});
		expect(props.setSettings).toBeCalled();
		wrapper.find('.inputFour').first().simulate('change', {currentTarget: {value: '2'}});
		expect(props.setSettings).toBeCalled();
		wrapper.find('.inputEssence').first().simulate('change', {currentTarget: {value: '2'}});
		expect(props.setSettings).toBeCalled();
	})
});

