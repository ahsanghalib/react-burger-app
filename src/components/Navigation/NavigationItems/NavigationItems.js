import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
	render() {
		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem links="/">Burger Builder</NavigationItem>
				<NavigationItem links="/orders">Orders</NavigationItem>
			</ul>
		);
	}
}

export default NavigationItems;
