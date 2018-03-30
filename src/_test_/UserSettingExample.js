import {monsters} from '../monsters';

export function generateDefaultUserSettings() {
	const userSettings = {
		'four': {

		},
		'three': {

		},
		'essence': {
			magic: {
				low: 0,
				mid: 0,
				high: 0
			},
			fire: {
				low:0,
				mid:0,
				high:0
			},
			water: {
				low:0,
				mid:0,
				high:0
			},
			wind: {
				low:0,
				mid:0,
				high:0
			},
			light: {
				low:0,
				mid:0,
				high:0
			},
			dark: {
				low:0,
				mid:0,
				high:0
			}
		}
	}
	Object.keys(monsters).forEach((e) => {
		if (monsters[e].currentStars === 4) {
			userSettings['four'][e] = 0;
		} else if (monsters[e].currentStars <= 3) {
			userSettings['three'][e] = 0;
		}
	});
	return userSettings;

}