import React from 'react';
import { monsters } from '../monsters';
import Monster from './Monster';
import Header from './Header';
import MiniCart from './MiniCart';

import { incrementInCart, decrementInCart, initializeCart, removeFromCart } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PropTypes from "prop-types";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters
		};
	};

	componentWillMount() {
		if (Object.keys(this.props.cart).length === 0) {
			const cart = JSON.parse(localStorage.getItem('cart'));
			this.props.initializeCart(cart);
		}
	}

	addToCart = key => {
		this.props.incrementInCart(key);
	};

	decrementFromCart = key => {
		this.props.decrementInCart(key);
	};

	removeFromCart = key => {
		this.props.removeFromCart(key);
	};


	render() {
		return (
			<div>
				<div className="mini-cart-display">
					<MiniCart 
						cart={this.props.cart} 
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({incrementInCart, initializeCart, decrementInCart, removeFromCart}, dispatch);
}

function mapStateToProps({cart}) {
	return {cart};
}


App.propTypes = {
	cart: PropTypes.object.isRequired,
	incrementInCart: PropTypes.func.isRequired,	
	decrementInCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(App);