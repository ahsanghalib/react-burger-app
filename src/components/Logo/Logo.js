import React, { Component } from 'react';
import logo from '../../assets/images/132 burger-logo.png';
import classes from './Logo.module.css';

class Logo extends Component {
	render() {
		return (
			<div className={classes.Logo}>
				<img src={logo} alt="burger-logo" />
			</div>
		);
	}
}

export default Logo;
