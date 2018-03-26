import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

import {initializeCart, initializeUserSettings } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters,
			requiredMonsters: {},
			ignore5Stars: false,
			removedFromCart: {}
		};
	};

	componentDidMount() {
		this.configureInitialSettings(this.props);
	}

	componentDidUpdate() {
		if (JSON.stringify(this.props.cart) !== JSON.stringify({}) &&
			JSON.stringify(this.props.userSettings) !== JSON.stringify({})) {
			this.generateRequiredInformation();		
		}
	}

	configureInitialSettings = (propsToCheck) => {
		let cart = propsToCheck.cart;
		if (Object.keys(cart).length === 0) {
			cart = JSON.parse(localStorage.getItem('cart'));
			this.props.initializeCart(cart);
		}

		let userSettings = propsToCheck.userSettings;
		if (Object.keys(userSettings).length === 0) {
			userSettings = JSON.parse(localStorage.getItem('userSettings'));
			this.props.initializeUserSettings(userSettings);
		}
	}

	generateRequiredInformation = () => {
		let cart = this.props.cart;
		let userSettings = this.props.userSettings;
		let requiredMonsters = {};
		let removedFromCart = [];

		//validation
		Object.keys(cart).forEach( (e) => {
			if (cart[e] <= 0) {
				return delete cart[e];
			} else {
				//Add in user totals here for calculating if they already have the monster
				if (monsters[e].currentStars <= 3) {
					requiredMonsters[e] = requiredMonsters[e] + cart[e] - userSettings.three[e] || cart[e] - userSettings.three[e];
					if (requiredMonsters[e] <= 0) {
						delete requiredMonsters[e];
					}
					return delete cart[e];
				} else if (monsters[e].currentStars === 4) {
					let currentNeeded = cart[e] - userSettings.four[e];
					removedFromCart[e] = userSettings.four[e];
					if (currentNeeded > 0) {
						cart[e] = currentNeeded;
						monsters[e].requires.forEach((f) => {
							requiredMonsters[f] = requiredMonsters[f] + currentNeeded || currentNeeded;
						})
					} else {
						delete cart[e];
					}

				}

			}
		});
		//setting state
		if (JSON.stringify(requiredMonsters) !== JSON.stringify(this.state.requiredMonsters) || 
			JSON.stringify(removedFromCart) !== JSON.stringify(this.state.removedFromCart)) {
				this.setState({
					requiredMonsters,
					removedFromCart
				});
		}
	}

	countCart = () => {
		let total = 0; 
		Object.keys(this.props.cart).forEach((e) => {
			if (monsters[e].currentStars >= 4) {
				total+=parseInt(this.props.cart[e], 10);
			};
		});
		return total;
	}
	//Total Amount of Each Essence Needed to fuse, does not include the essence for those in cart
	//List of Required Monsters
	//List of Monsters in Cart above 4 stars that you are going to make

	organizeEssenceData = (dataToUse, fodder = true) => {
		let totalEssences = {
			magic: {
				low: 0,
				mid: 0,
				high: 0
			},
			fire: {
				low:0,
				mid:0,
				high:0
			},
			water: {
				low:0,
				mid:0,
				high:0
			},
			wind: {
				low:0,
				mid:0,
				high:0
			},
			light: {
				low:0,
				mid:0,
				high:0
			},
			dark: {
				low:0,
				mid:0,
				high:0
			}
		}
		Object.keys(dataToUse).forEach((e) => {
			if (this.state.ignore5Stars && monsters[e].currentStars === 5) {
				return;
			}
			//check in user total if the monster is already awakened and skip
			let amount = dataToUse[e];
			try {
				totalEssences[monsters[e].element].low += monsters[e].lowEle * amount;
				totalEssences[monsters[e].element].mid += monsters[e].midEle * amount;
				totalEssences[monsters[e].element].high += monsters[e].highEle * amount;
				totalEssences['magic'].low += monsters[e].lowMagic * amount;
				totalEssences['magic'].mid += monsters[e].midMagic * amount;
				totalEssences['magic'].high += monsters[e].highMagic * amount;
			}catch (error) {
				console.log(`There was an error with unit ${e}, please let me know`);
			}
		});
		if (fodder && Object.keys(this.props.userSettings).length > 0) {
			Object.keys(totalEssences).forEach((e) => {
				Object.keys(totalEssences[e]).forEach((f) => {
					totalEssences[e][f] -= this.props.userSettings.essence[e][f]; 
					if (totalEssences[e][f] < 0) {
						totalEssences[e][f] = 0;
					}
				})
			})
		}
		let rows = Object.keys(totalEssences).map((e) => {
			return <tr key={e}>
						<td style={{textTransform: 'capitalize'}}>{e}</td>
						<td>{totalEssences[e].low}</td>
						<td>{totalEssences[e].mid}</td>
						<td>{totalEssences[e].high}</td>
					</tr>
		});
		let jsx = (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Low</th>
						<th>Mid</th>
						<th>High</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
		return jsx;
	};

	monstersTable = (dataToUse) => {
		let rows = Object.keys(dataToUse).map((e) => {
			return <tr key={e}>
						<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
						<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
						<td style={{textTransform: 'capitalize'}}>{e}</td>
						<td>{dataToUse[e]}</td>
						<td>{monsters[e].currentStars}</td>
					</tr>
		});
		let jsx = (
			<table>
				<thead>
					<tr>
						<th>Element</th>
						<th>Unit</th>
						<th>Name</th>
						<th>Amount</th>
						<th>Level</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
		return jsx;
	}

	handleButton = () => {
		this.setState({
			ignore5Stars: !this.state.ignore5Stars
		})
	}
	render() {
		//this.generateRequiredInformation();
		let totalEssences = this.organizeEssenceData(this.state.requiredMonsters);
		let totalRequired = this.monstersTable(this.state.requiredMonsters);
		let totalCart = this.monstersTable(this.props.cart);
		let totalEssenceInCart = this.organizeEssenceData(this.props.cart, false);

		return (
			<div className="checkout-display"> 
				<Header displayInformation={false} />
				<div className="content">
					<div className="checkout-display" style={{width: '400px', margin: '0 auto'}}>
						<h4>To make the {this.countCart()} units in your cart, you need the following monsters:</h4>
						<h6 style={{color: 'rgba(0,0,0,.4)'}}>Please note, the 4 stars in your cart may be used in making any 5 stars. What is listed below is everything required to make sure you can make everything.</h6>
					</div>
					{totalEssences}
					{totalRequired}
					{totalCart}
					<h6>The Following Units were removed from your cart as you have indicated you already own them.</h6>
					<ul>
					{
						// eslint-disable-next-line
						Object.keys(this.state.removedFromCart).map((e) => {
							if (this.state.removedFromCart[e] > 0) {
								return <li key={e}>{e}: {this.state.removedFromCart[e]}</li>;
							}
						})
					}
					</ul>

					<button className="button" onClick={this.handleButton}>Ignore 5 stars in cart</button>
					{totalEssenceInCart}
				</div>
			</div>
		)
	}
};


function mapDispatchToProps(dispatch) {
	return bindActionCreators({initializeUserSettings, initializeCart}, dispatch);
}

function mapStateToProps(state) {
	return {
		cart: state.cart, 
		userSettings: state.userSettings
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);