import React, { Component } from 'react';
import classes from './Backdrop.module.css';

class Backdrop extends Component {
	render() {
		return this.props.show ? <div className={classes.Backdrop} onClick={this.props.clicked}/> : null;
	}
}

export default Backdrop;
