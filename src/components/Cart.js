import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';
import MiniCart from './MiniCart';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters,
			cart: {}
		};
	};

	componentDidMount() {
		const cart = JSON.parse(localStorage.getItem('cart'));
		Object.keys(cart).forEach( (e) => {
			if (cart[e] <= 0) {
				delete cart[e];
			}
		});
		this.setState({
			cart
		});
	}

	addToCart = key => {
		const cart = {...this.state.cart};
		cart[key] = cart[key] + 1 || 1;
		if (monsters[key].currentStars === 5) {
			monsters[key].requires.forEach( (e) => {
				cart[e] = cart[e] + 1 || 1;
			});
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		this.setState({cart});
	};

	decrementFromCart = key => {
		const cart = {...this.state.cart};
		cart[key] = cart[key] - 1 || 0;
		if (monsters[key].currentStars === 5) {
			monsters[key].requires.forEach( (e) => {
				cart[e] = cart[e] - 1 || 0;
				if (cart[e] <= 0) {
					delete cart[e];
				}
			});
		}
		if (cart[key] <= 0) {
			delete cart[key];
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		this.setState({cart});
	};

	removeFromCart = key => {
		const cart = {...this.state.cart};
		if (monsters[key].currentStars === 5) {
			monsters[key].requires.forEach( (e) => {
				cart[e] = cart[e] - cart[key] || 0;
				if (cart[e] <= 0) {
					delete cart[e];
				}
			});
		}
		delete cart[key];
		localStorage.setItem('cart', JSON.stringify(cart));
		this.setState({cart});
	};

	countCart = () => {
		let total = 0;
		Object.keys(this.state.cart).forEach( (e) => {
			total += this.state.cart[e];
		});
		return total;
	};

	render() {
		return (
			<div className="cart-app-display"> 
				<Header displayInformation={false} />
				<div className="content">
					<div className="cart-display">
						<MiniCart 
						cart={this.state.cart} 
						add={this.addToCart}
						decrement={this.decrementFromCart}
						remove={this.removeFromCart}
							/>
					</div> 
					<div className="cart-right-hand">
						<h4>Total Amount {this.countCart()}</h4>
					</div>
				</div>
			</div>
		)
	}
};