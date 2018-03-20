import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';
import ReactDataGrid from 'react-data-grid';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters,
			cart: {},
			userTotal: {},
			requiredMonsters: {}
		};
	};

	componentDidMount() {
		const cart = JSON.parse(localStorage.getItem('cart'));
		let userTotal = JSON.parse(localStorage.getItem('userTotal'));
		let requiredMonsters = {};
		//validation
		Object.keys(cart).forEach( (e) => {
			if (cart[e] <= 0) {
				return delete cart[e];
			} else {
				if (monsters[e].currentStars <= 3) {
					requiredMonsters[e] = requiredMonsters[e] + cart[e] || cart[e];
				} else if (monsters[e].currentStars === 4) {
					monsters[e].requires.forEach((f) => {
						requiredMonsters[f] = requiredMonsters[f] + cart[e] || cart[e];
					})
				}

			}
		});
		if (!userTotal) {
			userTotal = {};
		}
		//setting state
		this.setState({
			cart,
			userTotal,
			requiredMonsters
		});
	}

	countCart = () => {
		let total = 0; 
		Object.keys(this.state.cart).forEach((e) => {
			if (monsters[e].currentStars >= 4) {
				total+=this.state.cart[e];
			};
		});
		return total;
	}

	render() {
		return (
			<div className="checkout-display"> 
				<Header displayInformation={false} />
				<div className="content">
					<div className="checkout-display">
					</div> 
					<div className="checkout-right-hand" style={{width: '400px', margin: '0 auto'}}>
						<h4>To make the {this.countCart()} units in your cart, you need the following monsters:</h4>
						<h6 style={{color: 'rgba(0,0,0,.4)'}}>Please note, the 4 stars in your cart may be used in making any 5 stars. What is listed below is everything required to make sure you can make everything.</h6>
					</div>
				</div>
			</div>
		)
	}
};