import {CART_NAMING} from '../actions/index';
import { monsters } from '../monsters';

const cart = (state = {}, action) => {
	let cart = null,
		key = null;
	switch(action.type) {
		case CART_NAMING.INITIALIZE_IN_CART:
			cart = action.payload;
			Object.keys(cart).forEach( (e) => {
				if (cart[e] <= 0) {
					delete cart[e];
				} else {
					cart[e] = parseInt(cart[e], 10);
				}
			});
			return {...cart};
		case CART_NAMING.INCREMENT_IN_CART:
			cart = state;
			key = action.payload;
			cart[key] = parseInt(cart[key], 10) + 1 || 1;
			if (monsters[key].currentStars === 5) {
				monsters[key].requires.forEach( (e) => {
					if (monsters[e].currentStars > 3) {
						cart[e] = parseInt(cart[e], 10) + 1 || 1;
					}
				});
			}
			localStorage.setItem('cart', JSON.stringify(cart));
			return {...cart};
		case CART_NAMING.DECREMENT_IN_CART:
			cart = state;
			key = action.payload;
			cart[key] = parseInt(cart[key], 10) - 1 || 0;
			if (monsters[key].currentStars === 5) {
				monsters[key].requires.forEach( (e) => {
					cart[e] = parseInt(cart[e], 10) - 1 || 0;
					if (cart[e] <= 0) {
						delete cart[e];
					}
				});
			}
			if (cart[key] <= 0) {
				delete cart[key];
			}
			localStorage.setItem('cart', JSON.stringify(cart));
			return {...cart};
		case CART_NAMING.SET_IN_CART:
			cart = state;
			key = action.payload.key;
			let value = action.payload['value'];
			if (action.payload['value'] !== "" || !isNaN(value)) {
				value = parseInt(action.payload['value'], 10);
			} 
			cart[key] = value;
			if (monsters[key].currentStars === 5 && typeof value === 'number' && !isNaN(value)) {
				monsters[key].requires.forEach( (e) => {
					if (monsters[e].currentStars > 3) {
						cart[e] = value;
					}
				});
			}
			localStorage.setItem('cart', JSON.stringify(cart));
			return {...cart};
		case CART_NAMING.REMOVE_FROM_CART:
			cart = state;
			key = action.payload;
			if (monsters[key].currentStars === 5) {
				monsters[key].requires.forEach( (e) => {
					cart[e] = parseInt(cart[e], 10) - parseInt(cart[key], 10) || 0;
					if (cart[e] <= 0) {
						delete cart[e];
					}
				});
			}
			delete cart[key];
			localStorage.setItem('cart', JSON.stringify(cart));
			return {...cart};
		default: 
			cart = localStorage.getItem('cart');
			if (!cart || JSON.stringify({}) === cart) {
				cart = {};
			} else {
				cart = JSON.parse(cart);
			}
			return {...cart};
	}
}

export default cart