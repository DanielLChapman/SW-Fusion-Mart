import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

import PropTypes from "prop-types";

import { initializeUserSettings, decrementSettings, incrementSettings, setSettings, resetSettings, saveSettings } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class UserSettings extends React.Component {
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
		if (userSettings == null || Object.keys(userSettings.four).length === 0) {
			return this.props.initializeUserSettings(this.state.userSettings);
		} 
		return this.props.initializeUserSettings(userSettings);
		//initializing user settings
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			userSettings: nextProps.userSettings
		})
	}

	decrement = (identifier, name, type = 'unit') => {
		this.props.decrementSettings(identifier, name, type);
	};

	incremenet = (identifier, name, type = 'unit') => {
		this.props.incrementSettings(identifier, name, type);
	}

	handleChange = (event, identifier, name, type = 'unit') => {
		this.props.setSettings(event.currentTarget.value, identifier, name, type);
	}

	reset = () => {
		this.props.resetSettings();
	}

	save = () => {
		this.props.saveSettings();
	}

	render() {
		return (
			<div>
				<Header displayInformation={false} />
				<button className="button" onClick={() => {if(window.confirm('Are you sure you wish to reset? You will still have to save your new resetted data, this just clears the fields.')) {this.reset()}}}>RESET</button>
				<button className="button" onClick={() => {if(window.confirm('Are you sure you wish to save? This will override your current saved data if it exists.')) {this.save()}}}>SAVE</button>
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

UserSettings.propTypes = {
	initializeUserSettings: PropTypes.object.isRequired,
	incrementSettings: PropTypes.func.isRequired,	
	decrementSettings: PropTypes.func.isRequired,
	setSettings: PropTypes.func.isRequired,
	resetSettings: PropTypes.func.isRequired,
	saveSettings: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({initializeUserSettings, decrementSettings, incrementSettings, setSettings, resetSettings, saveSettings}, dispatch);
}

function mapStateToProps({userSettings}) {
	return {userSettings};
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);