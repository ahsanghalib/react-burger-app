import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0
			},
			totalPrice: 4,
			purchaseable: false,
			purchasing: false
		};
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({
			purchaseable: sum > 0
		});
	};

	addIngrdientsHanlder = type => {
		const oldCount = this.state.ingredients[type];

		const updatedCount = oldCount + 1;

		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice;

		this.setState({
			totalPrice: priceAddition,
			ingredients: updatedIngredients
		});

		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHanlder = type => {
		const oldCount = this.state.ingredients[type];

		if (oldCount <= 0) return;

		const updatedCount = oldCount - 1;

		const updatedIngredients = {
			...this.state.ingredients
		};

		updatedIngredients[type] = updatedCount;

		const priceDeduction = this.state.totalPrice - INGREDIENT_PRICES[type];

		this.setState({
			totalPrice: priceDeduction,
			ingredients: updatedIngredients
		});

		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHanlder = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHanlder = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHanlder = () => {
		alert('You continue');
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<div>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHanlder}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancel={this.purchaseCancelHanlder}
						purchaseContinue={this.purchaseContinueHanlder}
						price={this.state.totalPrice}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngrdientsHanlder}
					ingredientRemoved={this.removeIngredientHanlder}
					disabled={disabledInfo}
					purchaseable={this.state.purchaseable}
					price={this.state.totalPrice}
					ordered={this.purchaseHanlder}
				/>
			</div>
		);
	}
}

export default BurgerBuilder;


