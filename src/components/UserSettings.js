import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

export default class UserSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSettings: {
				'four': {

				},
				'three': {

				},
				'essence': {
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
			}
		}
	};

	componentDidMount() {
		let userSettings = JSON.parse(localStorage.getItem('userSettings'));
		//initializing user settings
		if (userSettings == null) {
			userSettings = this.state.userSettings;
			Object.keys(monsters).forEach((e) => {
				if (monsters[e].currentStars === 4) {
					userSettings['four'][e] = 0;
				} else if (monsters[e].currentStars <= 3) {
					userSettings['three'][e] = 0;
				}
			});
			localStorage.setItem('userSettings', JSON.stringify(userSettings));
		}
		this.setState({
			userSettings
		});
	};

	decrement = (identifier, name, type = 'unit') => {
		console.log(type + " " + identifier + " " + name);
		let userSettings = this.state.userSettings;
		if (type === 'unit' ) {
			userSettings[identifier][name] -= 1;
			if (userSettings[identifier][name] < 0) {
				userSettings[identifier][name] = 0
			}
		} else {
			userSettings[type][name][identifier] -= 1;
			if (userSettings[type][name][identifier] < 0)  {
				userSettings[type][name][identifier] = 0
			}
		}
		this.setState({
			userSettings
		});
	};

	incremenet = (identifier, name, type = 'unit') => {
		let userSettings = this.state.userSettings;
		if (type === 'unit' ) {
			userSettings[identifier][name] += 1;
		} else {
			userSettings[type][name][identifier] += 1;
		}
		this.setState({
			userSettings
		});
	}

	handleChange = (event, identifier, name, type = 'unit') => {
		let userSettings = this.state.userSettings;
		if (type === 'unit' ) {
			userSettings[identifier][name] = event.currentTarget.value;
		} else {
			userSettings[type][name][identifier] = event.currentTarget.value;
		}
		this.setState({
			userSettings
		});
	}

	reset = () => {
		let userSettings = this.state.userSettings;
		Object.keys(monsters).forEach((e) => {
			if (monsters[e].currentStars === 4) {
				userSettings['four'][e] = 0;
			} else if (monsters[e].currentStars <= 3) {
				userSettings['three'][e] = 0;
			}
		});
		userSettings.essence = {
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
		localStorage.setItem('userSettings', JSON.stringify(userSettings));
		this.setState({
			userSettings
		});
	}

	save = () => {
		//Validate nothing is null, NaN, etc.
		let userSettings = this.state.userSettings;
		//validate fours
		Object.keys(userSettings.four).forEach((e) => {
			if (userSettings.four[e] === "" || isNaN(userSettings.four[e])) {
				userSettings.four[e] = 0;
			}
		});
		//validate threes
		Object.keys(userSettings.three).forEach((e) => {
			if (userSettings.three[e] === "" || isNaN(userSettings.three[e])) {
				userSettings.three[e] = 0;
			}
		});
		Object.keys(userSettings.essence).forEach((e) => {
			//low
			if (userSettings.essence[e].low === "" || isNaN(userSettings.essence[e].low)) {
				userSettings.essence[e].low = 0;
			}
			//mid
			if (userSettings.essence[e].mid === "" || isNaN(userSettings.essence[e].mid)) {
				userSettings.essence[e].mid = 0;
			}
			//high
			if (userSettings.essence[e].high === "" || isNaN(userSettings.essence[e].high)) {
				userSettings.essence[e].high = 0;
			}
		});
		//Save
		localStorage.setItem('userSettings', JSON.stringify(userSettings));
		this.setState({userSettings});
		
	}

	render() {
		return (
			<div>
				<Header displayInformation={false} />
				<button className="button" onClick={this.reset}>RESET</button>
				<button className="button" onClick={this.save}>SAVE</button>
				<h3>Update this information so we can tell you accurately what you need to fuse your selections. </h3>
				<section className="user-settings-display">
					<div className="four-star-selection">
						<h4>Which 4 Stars Do You Have</h4>
						<table>
							<thead>
								<tr>
									<th>Element</th>
									<th>Unawakened Name</th>
									<th>Name</th>
									<th>Amount You Have</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(this.state.userSettings.four).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td>
												<span onClick={() => {this.decrement('four', e)}}>-</span> 
													 <input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'four', e)}}
												          value={this.state.userSettings.four[e]}
												        />
												<span onClick={() => {this.incremenet('four', e)}}>+</span></td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="three-star-selection">
						<h4>Which 2 or 3 Stars Do You Have</h4>
						<table>
							<thead>
								<tr>
									<th>Element</th>
									<th>Unawakened Name</th>
									<th>Name</th>
									<th>Amount You Have</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(this.state.userSettings.three).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td>
												<span onClick={() => {this.decrement('three', e)}}>-</span>
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'three', e)}}
												          value={this.state.userSettings.three[e]}
												        />
												<span onClick={() => {this.incremenet('three', e)}}>+</span>
											</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="essence-selection">
						<h4>How Much Essence Do You Have</h4>
						<table>
							<thead>
								<tr>
									<th>Element</th>
									<th>Low</th>
									<th>Mid</th>
									<th>High</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(this.state.userSettings.essence).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{e}</td>
											<td>
												<span onClick={() => {this.decrement('low', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'low', e, 'essence')}}
												          value={this.state.userSettings.essence[e].low}
												        />
												<span onClick={() => {this.incremenet('low', e, 'essence')}}>+</span>
											</td>
											<td>
												<span onClick={() => {this.decrement('mid', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'mid', e, 'essence')}}
												          value={this.state.userSettings.essence[e].mid}
												        />
												<span onClick={() => {this.incremenet('mid', e, 'essence')}}>+</span>
											</td>
											<td>
												<span onClick={() => {this.decrement('high', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'high', e, 'essence')}}
												          value={this.state.userSettings.essence[e].high}
												        />
												<span onClick={() => {this.incremenet('high', e, 'essence')}}>+</span>
											</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
				</section>
			</div>
			

		)
	}
}