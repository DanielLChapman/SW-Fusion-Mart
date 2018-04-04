import reducer from '../../reducers/settings';
import { SETTING_NAMING } from '../../actions/index.js';

import {generateDefaultUserSettings} from '../UserSettingExample';

var userSettings = {
	'four': {}
};

describe('CART_REDUCER', () => {
	beforeEach(function() {
		userSettings = generateDefaultUserSettings();
	})
	it('should return the initial state as an object, not array', () => {
		expect(reducer(undefined, {})).toEqual(userSettings);
	});
	it('should initialize correctly', () => {
		expect(JSON.stringify(reducer({}, {
				type: SETTING_NAMING.INITIALIZE_SETTINGS,
				payload: userSettings
			}))).toEqual(JSON.stringify(userSettings));
	});

	it('should increment correctly', () => {
		let userSettings2 = Object.assign(userSettings);
		userSettings2.four.arang += 1;
		expect(JSON.stringify(reducer(userSettings, {
				type: SETTING_NAMING.INCREMENT_SETTINGS,
				payload: {
					identifier: 'four',
					name: 'arang',
					type: 'unit'
				}
			}))).toEqual(JSON.stringify(userSettings2));
	});

	it('should decrement correctly', () => {
		userSettings.four.arang = 1;
		let userSettings2 = Object.assign(userSettings);
		userSettings2.four.arang -= 1;
		expect(JSON.stringify(reducer(userSettings, {
				type: SETTING_NAMING.DECREMENT_SETTINGS,
				payload: {
					identifier: 'four',
					name: 'arang',
					type: 'unit'
				}
			}))).toEqual(JSON.stringify(userSettings2));
	});

	it('should set correctly', () => {
		let userSettings2 = Object.assign(userSettings);
		userSettings2.four.arang = 5;
		expect(JSON.stringify(reducer(userSettings, {
				type: SETTING_NAMING.DECREMENT_SETTINGS,
				payload: {
					identifier: 'four',
					name: 'arang',
					type: 'unit',
					value: 5
				}
			}))).toEqual(JSON.stringify(userSettings2));
	});

	it('should reset correctly', () => {
		let userSettings2 = Object.assign(userSettings);
		userSettings2.four.arang = 5;
		userSettings.four.arang = 0;
		expect(JSON.stringify(reducer(userSettings2, {
				type: SETTING_NAMING.RESET_SETTINGS,
				payload: {}
			}))).toEqual(JSON.stringify(userSettings));
	});

	it('should save correctly', () => {
		let userSettings2 = Object.assign(userSettings);
		userSettings2.four.arang = NaN;
		userSettings.four.arang = 0;
		expect(JSON.stringify(reducer(userSettings2, {
				type: SETTING_NAMING.SAVE_SETTINGS,
				payload: {}
			}))).toEqual(JSON.stringify(userSettings));
	});


});