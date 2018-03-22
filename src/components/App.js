import React from 'react';
import { monsters } from '../monsters';
import Monster from './Monster';
import Header from './Header';
import MiniCart from './MiniCart';

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class App extends React.Component {
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
				if (monsters[e].currentStars > 3) {
					cart[e] = cart[e] + 1 || 1;
				}
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


	render() {
		return (
			<div>
				<div className="mini-cart-display">
					<MiniCart 
					cart={this.state.cart} 
					add={this.addToCart}
					decrement={this.decrementFromCart}
					remove={this.removeFromCart}
					/>
				</div> 
				<Header 
					displayInformation={true}/>
				{
					// eslint-disable-next-line
					Object.keys(monsters).map((x) => {
						if (this.state.monsters[x].currentStars >= 4) {
							return <Monster 
								monster={this.state.monsters[x]} 
								key={x} 
								index={x} 
								add={this.addToCart} 
								 />
						}
					})

				}
			</div>
		)
	}
};