import reducer from '../../reducers/cart';
import { CART_NAMING } from '../../actions/index.js';

describe('CART_REDUCER', () => {
	it('should return the initial state as an object, not array', () => {
		expect(reducer(undefined, {})).toEqual({});
	});

	it('should handle INCREMENT_IN_CART with a 5 star to add in the required monsters', () => {
		expect(
			reducer([], {
				type: CART_NAMING.INCREMENT_IN_CART,
				payload: 'jeanne'
			})
		).toEqual({
			'harmonia': 1,
			'jeanne': 1,
			'kaz': 1,
			'lingling': 1
		})
	});

	it('should handle INCREMENT_IN_CART with a 4 star', () => {
		expect(
			reducer([], {
				type: CART_NAMING.INCREMENT_IN_CART,
				payload: 'kaz'
			})
		).toEqual({
			'kaz': 1
		})
	});

	it('should handle increment then decrement', () => {
		expect(
			reducer({
				'harmonia': 1,
				'jeanne': 1,
				'kaz': 1,
				'lingling': 1
			}, {
				type: CART_NAMING.DECREMENT_IN_CART,
				payload: 'kaz'
			})
		).toEqual({
			'harmonia': 1,
			'jeanne': 1,
			'lingling': 1
		})

	});

	//setting in cart
	it('should handle setting in cart a null value', () => {
		expect(
			reducer({
				'harmonia': 1,
				'jeanne': 1,
				'kaz': 1,
				'lingling': 1
			}, {
				type: CART_NAMING.SET_IN_CART,
				payload: {
					key: 'jeanne',
					value: '""'
				}
			})
		).toEqual({
			'harmonia': 1,
			"jeanne": NaN,
			'kaz': 1,
			'lingling': 1
		})

	});

	it('should handle setting in cart a 5 star unit value', () => {
		expect(
			reducer({
				'harmonia': 1,
				'jeanne': 1,
				'kaz': 1,
				'lingling': 1
			}, {
				type: CART_NAMING.SET_IN_CART,
				payload: {
					key: 'jeanne',
					value: '2'
				}
			})
		).toEqual({
			'harmonia': 2,
			'jeanne': 2,
			'kaz': 2,
			'lingling': 2
		})

	});

	//removing from cart
	it('should handle REMOVE_FROM_CART with a 4 star', () => {
		expect(
			reducer({
				'harmonia': 1,
				'jeanne': 1,
				'kaz': 1,
				'lingling': 1
			}, {
				type: CART_NAMING.REMOVE_FROM_CART,
				payload: 'kaz'
			})
		).toEqual({
			'harmonia': 1,
			'jeanne': 1,
			'lingling': 1
		})
	});

	it('should handle REMOVE_FROM_CART with a 5 star', () => {
		expect(
			reducer({
				'harmonia': 1,
				'jeanne': 1,
				'kaz': 2,
				'lingling': 1
			}, {
				type: CART_NAMING.REMOVE_FROM_CART,
				payload: 'jeanne'
			})
		).toEqual({
			'kaz': 1
		})
	});
});