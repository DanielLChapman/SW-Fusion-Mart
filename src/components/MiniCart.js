import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { monsters } from '../monsters';

let sortedStars = [];


const MiniCart = props => {

	const renderingSortedCart = (cart) => {
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
			return <li key={`${e + Date.now()}`}>
				{e} Amount |{props.cart[e]}| 
				<span className="increment" onClick={() => {props.add(e)}}> +1 </span>
				<span className="decrement" onClick={() => {props.decrement(e)}}> -1 </span>
				<span className="remove" onClick={() => {props.remove(e)}}> X </span>
			</li>
		})
	};

	return (
		<div className="mini-cart">
			<ul>
			{	
				renderingSortedCart(props.cart)
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

MiniCart.propTypes = {
	cart: PropTypes.object.isRequired,
	add: PropTypes.func.isRequired,	
	decrement: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

export default MiniCart;

/*
return <li key={e}>
  				{e} Amount |{props.cart[e]}| 
  				<span className="increment" onClick={() => {props.add(e)}}> +1 </span>
  				<span className="decrement" onClick={() => {props.decrement(e)}}> -1 </span>
  				<span className="remove" onClick={() => {props.remove(e)}}> X </span>
  				</li>
  				*/