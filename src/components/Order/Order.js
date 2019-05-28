import React, { Component } from 'react';
import classes from './Order.module.css';

class Order extends Component {
	render() {
		const ingredients = [];
		for (let ing in this.props.ingredients) {
			ingredients.push({
				name: ing,
				amount: this.props.ingredients[ing]
			});
		}

		const ingOutput = ingredients.map(ig => {
			return (
				<span
					key={ig.name}
					style={{
						textTransform: 'capitalize',
						display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
					}}
				>
					{ig.name} ({ig.amount})
				</span>
			);
		});

		return (
			<div className={classes.Order}>
				<p>Ingredients: {ingOutput}</p>
				<p>
					Price <strong>{this.props.price}</strong>
				</p>
			</div>
		);
	}
}

export default Order;
