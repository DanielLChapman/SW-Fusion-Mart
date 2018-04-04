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
		Object.keys(cart).forEach( (e) => {
			if (monsters[e].currentStars === 5) {
				sortedStars.unshift(e);
			} else if (monsters[e].currentStars === 4) {
				sortedStars.push(e)
			} else {
				return e;
			}
		});

		return sortedStars.map( (e) => {
			return <tr key={e}>
						<td>{e}</td>
						<td className="mini-cart-td"><span className="decrement" onClick={() => {this.props.decrementInCart(e)}}> <i className="fas fa-minus"></i> </span>
							<input 
								type="number"
								onChange={(event) => {this.handleChange(event, e)}}
								value={this.props.cart[e]}
								className="cart-input"
								/>
							<span className="increment" onClick={() => {this.props.incrementInCart(e)}}> <i className="fas fa-plus"></i> </span>
							<span className="remove" onClick={() => {this.props.removeFromCart(e)}}> <i className="fas fa-times"></i> </span>
						</td>
					</tr>
		})
	};
	render() {
		return (
			<div className="mini-cart">
				<table className="cart-table">
					<thead>
						<tr>
							<th>Name</th>
							<th className="centered-text">Amount</th>
						</tr>
					</thead>
					<tbody>
						{	
							this.renderingSortedCart(this.props.cart)
						}
					</tbody>
				</table>
				<Link to="/cart" className="view-cart-button">
					<button className="button-link button-link-1">View Cart</button>
				</Link>
				<Link to="/checkout">
					<button className="button-link button-link-2">Checkout</button>
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