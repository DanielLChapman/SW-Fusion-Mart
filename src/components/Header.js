import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import MiniCart from './MiniCart';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			miniCartDisplay: {display: 'none'},
			preventOpening: false
		};
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.openCart && !this.state.preventOpening) {
			this.setState({
				miniCartDisplay: {display: 'block'}
			})
		}
	}

	alterMiniCart = (type) => {

		if (type === 'hide') {
			this.setState ( {
				miniCartDisplay: {display: 'none'},
				preventOpening: true
			})
		} else {
			this.setState ({
				miniCartDisplay: {display: 'block'}
			})
		}
	}

	render() {
		let tagInfo = (
			<Fragment>
				<h5 className="information">
					NOTICE: If you add a 5 star fusion, we automatically will add the 4 stars to your cart. 
					If you already have some of the 4 stars they will automatically be deducted from your cart if you have added them to your settings.
				</h5>
			</Fragment>
		);

		if (!this.props.displayInformation) {
			tagInfo = null;
		}


		return (
			<header className="left">
				{tagInfo}
				<div className="navigation">
					<input type="checkbox" id="toggle" />  
					<label htmlFor="toggle" className="mobile-menu-toggle"><i className="fas fa-bars"></i></label>
					<label htmlFor="toggle" className="mobile-menu-toggle-close"><i className="fas fa-times"></i></label>
					<nav>
						<ul>
							<li className="title-li">
								Summoners War Fusion Mart
							</li>
							<li>
								<Link to="/">
									Home
								</Link>
							</li>
							<li>
								<Link to="/cart">
									Cart
								</Link>
							</li>
							<li>
								<Link to="/settings">
									Settings
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<section className="cart-section">
					<div className="mini-cart-display" style={this.state.miniCartDisplay}>
						<button className="hide-cart" onClick={() => {this.alterMiniCart('hide')}}> &gt; &gt; &gt; </button>
						<MiniCart />
					</div>
					<div className="to-open-mini-cart"  onClick={() => {this.alterMiniCart('show')}}>
						<i className="fas fa-shopping-cart"></i>
					</div>
				</section>
			</header>
		);
	}
}

Header.propTypes = {
	displayInformation: PropTypes.bool.isRequired,
	openCart: PropTypes.bool
};
export default Header;