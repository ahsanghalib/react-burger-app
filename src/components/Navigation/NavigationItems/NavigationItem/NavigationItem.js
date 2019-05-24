import React, { Component } from 'react';
import classes from './NavigationItem.module.css';

class NavigationItem extends Component {
	render() {
		return (
			<li className={classes.NavigationItem}>
				<a
					href={this.props.links}
					className={this.props.active ? classes.active : null}
				>
					{this.props.children}
				</a>
			</li>
		);
	}
}

export default NavigationItem;
