import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { monsters } from '../monsters';

import { incrementInCart, decrementInCart, removeFromCart, setInCart } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


let sortedStars = [];


export class MiniCart extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			cart: {}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cart: nextProps.cart
		});
	}

	handleChange = (event, key) => {
		this.props.setInCart(key, event.currentTarget.value)
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

	renderingSortedCart = (cart) => {
		sortedStars = [];
		Object.keys(cart).map( (e) => {
			if (monsters[e].currentStars === 5) {
				sortedStars.unshift(e);
			} else {
				sortedStars.push(e)
			}
			return e;
			
		});

		return sortedStars.map( (e) => {
			return <li key={e}>
				{e} Amount <input 
								type="number"
								onChange={(event) => {this.handleChange(event, e)}}
								value={this.props.cart[e]}
								/>

				<span className="increment" onClick={() => {this.props.incrementInCart(e)}}> +1 </span>
				<span className="decrement" onClick={() => {this.props.decrementInCart(e)}}> -1 </span>
				<span className="remove" onClick={() => {this.props.removeFromCart(e)}}> X </span>
			</li>
		})
	};
	render() {
		return (
			<div className="mini-cart">
				<ul>
				{	
					this.renderingSortedCart(this.props.cart)
				}
				</ul>
				<Link to="/cart" className="view-cart-button">
					<button className="button-link">View Cart</button>
				</Link>
				<Link to="/checkout">
					<button className="button-link">Checkout</button>
				</Link>
			</div>
		);
	}

} 

MiniCart.propTypes = {
	cart: PropTypes.object.isRequired,
	incrementInCart: PropTypes.func.isRequired,	
	decrementInCart: PropTypes.func.isRequired,
	removeFromCart: PropTypes.func.isRequired,
	setInCart: PropTypes.func.isRequired
};


function mapDispatchToProps(dispatch) {
	return bindActionCreators({incrementInCart, decrementInCart, removeFromCart, setInCart}, dispatch);
}

function mapStateToProps({cart}) {
	return {cart};
}


export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);