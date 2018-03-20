import React, {Fragment} from 'react';
import PropTypes from "prop-types";

class Header extends React.Component {
	render() {
		let tagInfo = (
			<Fragment>
				<h3 className="tagline" style={{textAlign: 'center'}}>
					You want fusion monsters, and we have 'em!
				</h3>
				<h5 className="information" style={{textAlign: 'center', width: '600px', position: 'relative', margin: '0 auto'}}>
					If you add a 5 star fusion, we automatically will add the 4 stars to your cart. 
					If you already have some of the 4 stars they will automatically be deducted from your cart if you have added them to your settings.
				</h5>
			</Fragment>
		);

		if (!this.props.displayInformation) {
			tagInfo = null;
		}
		return (
			<header className="top">
				<h1>
					Summoners War Fusion Mart
				</h1>
				{tagInfo}
			</header>
		);
	}
}

Header.propTypes = {
	displayInformation: PropTypes.bool.isRequired
};
export default Header;