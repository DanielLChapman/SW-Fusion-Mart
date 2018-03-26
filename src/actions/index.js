export const CART_NAMING = {
	INCREMENT_IN_CART: "INCREMENT_IN_CART",
	DECREMENT_IN_CART: "DECREMENT_IN_CART",
	SET_IN_CART: "SET_IN_CART",
	INITIALIZE_IN_CART: "INITIALIZE_IN_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART"
}

export const SETTING_NAMING = {
	INITIALIZE_SETTINGS: "INITIALIZE_SETTINGS",
	INCREMENT_SETTINGS: "INCREMENT_SETTINGS",
	DECREMENT_SETTINGS: "DECREMENT_SETTINGS",
	SET_IN_SETTINGS: "SET_IN_SETTINGS",
	RESET_SETTINGS: "RESET_SETTINGS",
	SAVE_SETTINGS: "SAVE_SETTINGS"
};

export function setInCart (key, value) {
	const data = {
		key,
		value
	};
	return {
		type: CART_NAMING.SET_IN_CART,
		payload: data
	}
}

export function removeFromCart (key) {
	const data = key;
	return {
		type: CART_NAMING.REMOVE_FROM_CART,
		payload: data
	}
}


export function incrementInCart (key) {
	const data = key;
	return {
		type: CART_NAMING.INCREMENT_IN_CART,
		payload: data
	}
}

export function decrementInCart (key) {
	const data = key;
	return {
		type: CART_NAMING.DECREMENT_IN_CART,
		payload: data
	}
}

export function initializeCart (cart) {
	const data = cart;
	return {
		type: CART_NAMING.INITIALIZE_IN_CART,
		payload: data
	};
}


export function initializeUserSettings (settings) {
	const data = settings;
	return {
		type: SETTING_NAMING.INITIALIZE_SETTINGS,
		payload: data
	};
}

export function decrementSettings (identifier, name, type = 'unit') {
	const data = {
		identifier,
		name,
		type
	}

	return {
		type: SETTING_NAMING.DECREMENT_SETTINGS,
		payload: data
	}
}

export function incrementSettings (identifier, name, type = 'unit') {
	const data = {
		identifier,
		name,
		type
	}

	return {
		type: SETTING_NAMING.INCREMENT_SETTINGS,
		payload: data
	}
}

export function setSettings (value, identifier, name, type = 'unit') {
	const data = {
		identifier,
		name,
		type,
		value
	}

	return {
		type: SETTING_NAMING.SET_IN_SETTINGS,
		payload: data
	}
}

export function resetSettings () {
	const data = {}

	return {
		type: SETTING_NAMING.RESET_SETTINGS,
		payload: data
	}
}

export function saveSettings () {
	const data = {}

	return {
		type: SETTING_NAMING.SAVE_SETTINGS,
		payload: data
	}
}
