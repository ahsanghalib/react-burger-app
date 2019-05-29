import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
	render() {
		return (
			<ul className={classes.NavigationItems}>
				<NavigationItem links="/">Burger Builder</NavigationItem>
				{this.props.isAuthenticated ? (
					<NavigationItem links="/orders">Orders</NavigationItem>
				) : null}
				{!this.props.isAuthenticated ? (
					<NavigationItem links="/auth">Authenicate</NavigationItem>
				) : (
					<NavigationItem links="/logout">Logout</NavigationItem>
				)}
			</ul>
		);
	}
}

export default NavigationItems;
