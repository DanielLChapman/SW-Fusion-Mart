import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

import PropTypes from "prop-types";

import { initializeUserSettings, decrementSettings, incrementSettings, setSettings, resetSettings, saveSettings } from '../actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {generateDefaultUserSettings} from '../_test_/UserSettingExample';

export class UserSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSettings: {
				'four': {
				},
				'three': {
				},
				'essence': {
				}
			}
		}
	};

	componentWillMount() {
		try {
			let userSettings = JSON.parse(localStorage.getItem('userSettings'));
			if (userSettings == null || Object.keys(userSettings.four).length === 0) {
				return this.props.initializeUserSettings(this.state.userSettings);
			} 
			this.props.initializeUserSettings(userSettings);
		} catch (err) {
			console.log(err);
		}
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
		let data = this.props.userSettings;
		if(JSON.stringify(data) === JSON.stringify({})) {
			data = generateDefaultUserSettings();
		}
		return (
			<div>
				<Header displayInformation={false} />
				<button className="button reset-button" onClick={() => {if(window.confirm('Are you sure you wish to reset? You will still have to save your new resetted data, this just clears the fields.')) {this.reset()}}}>RESET</button>
				<button className="button save-button" onClick={() => {if(window.confirm('Are you sure you wish to save? This will override your current saved data if it exists.')) {this.save()}}}>SAVE</button>
				<h3>Update this information so we can tell you accurately what you need to fuse your selections. </h3>
				<section className="user-settings-display">
					<div className="four-star-selection">
						<h4>Which 4 Stars Do You Have</h4>
						<table className="four-star-table">
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
									Object.keys(data['four']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td>
												<span className="decrement decrementFour" onClick={() => {this.decrement('four', e)}}>-</span> 
													 <input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'four', e)}}
												          value={data['four'][e]}
												          className="inputFour"
												        />
												<span className="increment incrementFour" onClick={() => {this.incremenet('four', e)}}>+</span></td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="three-star-selection">
						<h4>Which 2 or 3 Stars Do You Have</h4>
						<table  className="three-star-table">
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
									Object.keys(data['three']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td>
												<span className="decrement decrementThree" onClick={() => {this.decrement('three', e)}}>-</span>
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'three', e)}}
												          value={data['three'][e]}
												          className="inputThree"
												        />
												<span className="increment incrementThree"  onClick={() => {this.incremenet('three', e)}}>+</span>
											</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="essence-selection">
						<h4>How Much Essence Do You Have</h4>
						<table  className="essence-table">
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
									Object.keys(data['essence']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{e}</td>
											<td>
												<span className="decrement decrementEssence" onClick={() => {this.decrement('low', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'low', e, 'essence')}}
												          value={data['essence'][e].low}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('low', e, 'essence')}}>+</span>
											</td>
											<td>
												<span className="decrement decrementEssence" onClick={() => {this.decrement('mid', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'mid', e, 'essence')}}
												          value={data['essence'][e].mid}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('mid', e, 'essence')}}>+</span>
											</td>
											<td>
												<span className="decrement decrementEssence" onClick={() => {this.decrement('high', e, 'essence')}}>-</span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'high', e, 'essence')}}
												          value={data['essence'][e].high}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('high', e, 'essence')}}>+</span>
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
	userSettings: PropTypes.object.isRequired,
	initializeUserSettings: PropTypes.func.isRequired,
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