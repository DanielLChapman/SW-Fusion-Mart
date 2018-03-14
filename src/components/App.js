import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monsters
		};
		this.returnImageForMonster = this.returnImageForMonster.bind(this);
	};

	returnImageForMonster = (key) => {
		let unawakenedName = this.state.monsters[key].unawakenedName; 
		unawakenedName = unawakenedName.split(' ').join('_');
		unawakenedName+=`_(${capitalizeFirstLetter(this.state.monsters[key].element)})_Icon.png`;
		return <img src={`../images/${unawakenedName}`} alt={key} />
	}


	render() {
		console.log(monsters);
		return (
			<div> 
				<Header />
				{
					Object.keys(monsters).map((x) => {
						return this.returnImageForMonster(x);
					})

				}
			</div>
		)
	}
};