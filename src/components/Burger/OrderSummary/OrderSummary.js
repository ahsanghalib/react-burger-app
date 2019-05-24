import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render() {
		const ingredientSumaary = Object.keys(this.props.ingredients).map(
			igKey => {
				return (
					<li key={igKey}>
						<span style={{textTransform: 'capitalize'}}>
                            {igKey}
                        </span> : {this.props.ingredients[igKey]}
					</li>
				);
			}
		);

		return (
			<div>
				<h3>Your Order</h3>
				<p>A delicious burger with following ingredients:</p>
				<ul>
                    {ingredientSumaary}
                </ul>
				<p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
				<Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
				<Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
			</div>
		);
	}
}

export default OrderSummary;
