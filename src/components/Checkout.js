import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters,
			cart: {},
			userSettings: {},
			requiredMonsters: {},
			ignore5Stars: false
		};
	};

	componentDidMount() {
		const cart = JSON.parse(localStorage.getItem('cart'));
		let userSettings = JSON.parse(localStorage.getItem('userSettings'));
		let requiredMonsters = {};
		if (!userSettings) {
			userSettings = {};
		}
		console.log(userSettings);
		//validation
		Object.keys(cart).forEach( (e) => {
			if (cart[e] <= 0) {
				return delete cart[e];
			} else {
				//Add in user totals here for calculating if they already have the monster
				if (monsters[e].currentStars <= 3) {
					requiredMonsters[e] = requiredMonsters[e] + cart[e] || cart[e];
					return delete cart[e];
				} else if (monsters[e].currentStars === 4) {
					monsters[e].requires.forEach((f) => {
						requiredMonsters[f] = requiredMonsters[f] + cart[e] || cart[e];
					})
				}

			}
		});
		//setting state
		this.setState({
			cart,
			userSettings,
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
	//Total Amount of Each Essence Needed to fuse, does not include the essence for those in cart
	//List of Required Monsters
	//List of Monsters in Cart above 4 stars that you are going to make

	organizeEssenceData = (dataToUse) => {
		let totalEssences = {
			fire: {
				low:0,
				mid:0,
				high:0
			},
			wind: {
				low:0,
				mid:0,
				high:0
			},
			water: {
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
			},
			magic: {
				low: 0,
				mid: 0,
				high: 0
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
		let totalEssences = this.organizeEssenceData(this.state.requiredMonsters);
		let totalRequired = this.monstersTable(this.state.requiredMonsters);
		let totalCart = this.monstersTable(this.state.cart);
		let totalEssenceInCart = this.organizeEssenceData(this.state.cart);
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
					<button className="button" onClick={this.handleButton}>Ignore 5 stars in cart</button>
					{totalEssenceInCart}
				</div>
			</div>
		)
	}
};