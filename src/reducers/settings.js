import {SETTING_NAMING} from '../actions/index';
import { monsters } from '../monsters';
import {generateDefaultUserSettings} from '../_test_/UserSettingExample';

const userSettings = (state = {}, action) => {
	let userSettings = null,
		identifier = null,
		name = null,
		type = null;

	switch(action.type) {
		case SETTING_NAMING.INCREMENT_SETTINGS:
			userSettings = state;
			identifier = action.payload.identifier;
			name = action.payload.name;
			type = action.payload.type;

			if (type === 'unit' ) {
				userSettings[identifier][name] = parseInt(userSettings[identifier][name], 10)+1;
			} else {
				userSettings[type][name][identifier] = parseInt(userSettings[type][name][identifier], 10)+1;
			}

			return {...userSettings};
		case SETTING_NAMING.DECREMENT_SETTINGS:
			userSettings = state;
			identifier = action.payload.identifier;
			name = action.payload.name;
			type = action.payload.type;

			if (type === 'unit' ) {
				userSettings[identifier][name] = parseInt(userSettings[identifier][name], 10)-1;
				if (userSettings[identifier][name] < 0) {
					userSettings[identifier][name] = 0
				}
			} else {
				userSettings[type][name][identifier] = parseInt(userSettings[type][name][identifier], 10)-1;
				if (userSettings[type][name][identifier] < 0)  {
					userSettings[type][name][identifier] = 0
				}
			}

			return {...userSettings};
		case SETTING_NAMING.SET_IN_SETTINGS:
			userSettings = state;
			identifier = action.payload.identifier;
			name = action.payload.name;
			type = action.payload.type;
			let value = action.payload.value;

			if (type === 'unit' ) {
				userSettings[identifier][name] = parseInt(value, 10);
			} else {
				userSettings[type][name][identifier] = parseInt(value, 10);
			}

			return {...userSettings};
		case SETTING_NAMING.RESET_SETTINGS:
			userSettings = generateDefaultUserSettings();
			return {...userSettings};
		case SETTING_NAMING.SAVE_SETTINGS:
			userSettings = state;

			//Validate nothing is null, NaN, etc.
			//Doing this here to make sure the state is updated for elsewhere in the application
			//validate fours
			Object.keys(userSettings.four).forEach((e) => {
				if (userSettings.four[e] === "" || isNaN(userSettings.four[e])) {
					userSettings.four[e] = 0;
				}
			});
			//validate threes
			Object.keys(userSettings.three).forEach((e) => {
				if (userSettings.three[e] === "" || isNaN(userSettings.three[e])) {
					userSettings.three[e] = 0;
				}
			});
			Object.keys(userSettings.essence).forEach((e) => {
				//low
				if (userSettings.essence[e].low === "" || isNaN(userSettings.essence[e].low)) {
					userSettings.essence[e].low = 0;
				}
				//mid
				if (userSettings.essence[e].mid === "" || isNaN(userSettings.essence[e].mid)) {
					userSettings.essence[e].mid = 0;
				}
				//high
				if (userSettings.essence[e].high === "" || isNaN(userSettings.essence[e].high)) {
					userSettings.essence[e].high = 0;
				}
			});
			//Save
			localStorage.setItem('userSettings', JSON.stringify(userSettings));

			return {...userSettings};
		default: 
			userSettings = localStorage.getItem('userSettings');
			if (!userSettings || Object.keys(JSON.parse(userSettings).four).length === 0) {
				userSettings = generateDefaultUserSettings();
				Object.keys(monsters).forEach((e) => {
					if (monsters[e].currentStars === 4) {
						userSettings['four'][e] = 0;
					} else if (monsters[e].currentStars <= 3) {
						userSettings['three'][e] = 0;
					}
				});
			
			} else {
				userSettings = JSON.parse(userSettings);
			}

			return {...userSettings};
	}
}

export default userSettings