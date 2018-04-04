import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';
import MiniCart from './MiniCart';

import { incrementInCart, decrementInCart, removeFromCart, setInCart } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PropTypes from "prop-types";

import { Link } from 'react-router-dom';

export class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters
		};
	};

	componentDidMount() {
	
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
							/>
					</div> 
					<div className="cart-right-hand">
						<h3 className="total-amount">Total ({this.countCart()} items)</h3>
						<Link to="/checkout">
							<button className="button-link">Checkout</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
};


function mapDispatchToProps(dispatch) {
	return bindActionCreators({incrementInCart, decrementInCart, removeFromCart, setInCart}, dispatch);
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