import React, { Component } from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

class BuildControls extends Component {
	render() {
		const controls = [
			{ label: 'Salad', type: 'salad' },
			{ label: 'Bacon', type: 'bacon' },
			{ label: 'Cheese', type: 'cheese' },
			{ label: 'Meat', type: 'meat' }
		];

		return (
			<div className={classes.BuildControls}>
				<p>
					Current Price:{' '}
					<strong>{this.props.price}</strong>
				</p>
				{controls.map(ctrl => {
					return (
						<BuildControl
							key={ctrl.label}
							label={ctrl.label}
							added={() => this.props.ingredientAdded(ctrl.type)}
							removed={() => this.props.ingredientRemoved(ctrl.type)}
							disabled={this.props.disabled[ctrl.type]}
						/>
					);
				})}
				<button
					className={classes.OrderButton}
					disabled={!this.props.purchaseable}
					onClick={this.props.ordered}
				>
					{this.props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
				</button>
			</div>
		);
	}
}

export default BuildControls;
