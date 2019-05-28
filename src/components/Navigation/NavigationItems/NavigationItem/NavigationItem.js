import React, { Component } from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

class NavigationItem extends Component {
	render() {
		return (
			<li className={classes.NavigationItem}>
				<NavLink to={this.props.links} exact activeClassName={classes.active}>
					{this.props.children}
				</NavLink>
			</li>
		);
	}
}

export default NavigationItem;
