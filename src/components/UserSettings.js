import React from 'react';
import { monsters } from '../monsters';
import Header from './Header';

import PropTypes from "prop-types";

import { decrementSettings, incrementSettings, setSettings, resetSettings, saveSettings } from '../actions/index';
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

		if(!data || JSON.stringify(data) === JSON.stringify({})) {
			data = generateDefaultUserSettings();
		}

		return (
			<div className="settings-page">
				<Header displayInformation={false} />
				<button className="settings-button reset-button" onClick={() => {if(window.confirm('Are you sure you wish to reset? You will still have to save your new resetted data, this just clears the fields.')) {this.reset()}}}>RESET FIELDS</button>
				<button className="settings-button save-button" onClick={() => {if(window.confirm('Are you sure you wish to save? This will override your current saved data if it exists.')) {this.save()}}}>SAVE SETTINGS</button>
				<h3>Update this information so we can tell you accurately what you need to fuse your selections. </h3>
				<section className="user-settings-display">
					<div className="four-star-selection">
						<h2>Which 4 Stars Do You Have?</h2>
						<table className="four-star-table">
							<thead>
								<tr>
									<th>Element</th>
									<th>Unawakened Name</th>
									<th>Name</th>
									<th className="centered-text">Amount You Have</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(data['four']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td className="centered-text">
												<span className="decrement decrementFour" onClick={() => {this.decrement('four', e)}}><i className="fas fa-minus"></i></span> 
													 <input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'four', e)}}
												          value={data['four'][e]}
												          className="inputFour"
												        />
												<span className="increment incrementFour" onClick={() => {this.incremenet('four', e)}}><i className="fas fa-plus"></i></span></td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="three-star-selection">
						<h2>Which 2 or 3 Stars Do You Have?</h2>
						<table  className="three-star-table">
							<thead>
								<tr>
									<th>Element</th>
									<th>Unawakened Name</th>
									<th>Name</th>
									<th className="centered-text">Amount You Have</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(data['three']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].element}</td>
											<td style={{textTransform: 'capitalize'}}>{monsters[e].unawakenedName}</td>
											<td>{e}</td>
											<td className="centered-text">
												<span className="decrement decrementThree" onClick={() => {this.decrement('three', e)}}><i className="fas fa-minus"></i></span>
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'three', e)}}
												          value={data['three'][e]}
												          className="inputThree"
												        />
												<span className="increment incrementThree"  onClick={() => {this.incremenet('three', e)}}><i className="fas fa-plus"></i></span>
											</td>
										</tr>)
									})
								}
							</tbody>
						</table>
					</div>
					<div className="essence-selection">
						<h2>How Much Essence Do You Have?</h2>
						<table  className="essence-table">
							<thead>
								<tr>
									<th>Element</th>
									<th className="centered-text">Low</th>
									<th className="centered-text">Mid</th>
									<th className="centered-text">High</th>
								</tr>
							</thead>
							<tbody>
								{
									Object.keys(data['essence']).map((e) => {
										return (<tr key={e}>
											<td style={{textTransform: 'capitalize'}}>{e}</td>
											<td className="centered-text">
												<span className="decrement decrementEssence" onClick={() => {this.decrement('low', e, 'essence')}}><i className="fas fa-minus"></i></span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'low', e, 'essence')}}
												          value={data['essence'][e].low}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('low', e, 'essence')}}><i className="fas fa-plus"></i></span>
											</td>
											<td className="centered-text">
												<span className="decrement decrementEssence" onClick={() => {this.decrement('mid', e, 'essence')}}><i className="fas fa-minus"></i></span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'mid', e, 'essence')}}
												          value={data['essence'][e].mid}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('mid', e, 'essence')}}><i className="fas fa-plus"></i></span>
											</td>
											<td className="centered-text">
												<span className="decrement decrementEssence" onClick={() => {this.decrement('high', e, 'essence')}}><i className="fas fa-minus"></i></span> 
													<input
												          type="number"
												          name="test"
												          min="0"
												          onChange={(y) => {this.handleChange(y, 'high', e, 'essence')}}
												          value={data['essence'][e].high}
												          className="inputEssence"
												        />
												<span className="increment incrementEssence" onClick={() => {this.incremenet('high', e, 'essence')}}><i className="fas fa-plus"></i></span>
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
	incrementSettings: PropTypes.func.isRequired,	
	decrementSettings: PropTypes.func.isRequired,
	setSettings: PropTypes.func.isRequired,
	resetSettings: PropTypes.func.isRequired,
	saveSettings: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({decrementSettings, incrementSettings, setSettings, resetSettings, saveSettings}, dispatch);
}

function mapStateToProps({userSettings}) {
	return {userSettings};
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);