import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';
import MiniCart from './MiniCart';

import { incrementInCart, decrementInCart, initializeCart, removeFromCart, setInCart } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PropTypes from "prop-types";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters
		};
	};

	componentDidMount() {
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


	countCart = () => {
		let total = 0;
		Object.keys(this.props.cart).forEach( (e) => {
			total += this.props.cart[e];
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
						cart={this.props.cart} 
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


function mapDispatchToProps(dispatch) {
	return bindActionCreators({incrementInCart, initializeCart, decrementInCart, removeFromCart, setInCart}, dispatch);
}

function mapStateToProps({cart}) {
	return {cart};
}

Cart.propTypes = {
	cart: PropTypes.object.isRequired,
	incrementInCart: PropTypes.func.isRequired,	
	decrementInCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	setInCart: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);