import React from 'react';
import { monsters } from '../monsters';
import Monster from './Monster';
import Header from './Header';

import { initializeCart, incrementInCart } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import PropTypes from "prop-types";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let openCart = false;

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters,
			cart: {}
		};
	};

	componentWillMount() {
		try {
			if (Object.keys(this.props.cart).length === 0) {
				const cart = JSON.parse(localStorage.getItem('cart'));
				this.props.initializeCart(cart);
			}
		} catch (err) {
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cart: nextProps.cart
		})
	}

	addToCart = (key) => {
		openCart = true;
		this.props.incrementInCart(key);
	}


	render() {
		return (
			<div>
				<Header 
					displayInformation={true}
					openCart={openCart} />
				<div className="main-monster-display">
					<ul>
						{
							// eslint-disable-next-line
							Object.keys(monsters).map((x) => {
								if (this.state.monsters[x].currentStars >= 4) {
									return <li key={x}><Monster 
											monster={this.state.monsters[x]} 
											key={x} 
											index={x} 
											add={this.addToCart} 
											 /></li>
								}
							})

						}
					</ul>
				</div>
			</div>
		)
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({initializeCart, incrementInCart}, dispatch);
}

function mapStateToProps({cart}) {
	return {cart};
}


App.propTypes = {
	cart: PropTypes.object.isRequired,
	initializeCart: PropTypes.func.isRequired,
	incrementInCart: PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(App);