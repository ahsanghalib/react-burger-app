import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
	render() {
		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem links="/" active>Burger Builder</NavigationItem>
				<NavigationItem links="/">Checkout</NavigationItem>
			</ul>
		);
	}
}

export default NavigationItems;
