import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHanlding from '../../ErrorHanlding/ErrorHanlding';

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
			ingredients: null,
			totalPrice: 4,
			purchaseable: false,
			purchasing: false,
			loading: false,
			error: false
		};
	}

	componentDidMount() {
		axios
			.get(
				'https://react-burger-app-ac1c8.firebaseio.com/ingredients.json'
			)
			.then(res => {
				this.setState({
					ingredients: res.data
				});
			})
			.catch(err => this.setState({ error: true }));
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

		let priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice;

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

		let priceDeduction = this.state.totalPrice - INGREDIENT_PRICES[type];

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
		// alert('You continue');
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Mr. XYZ',
				address: {
					street: 'ABC Colony',
					zipCode: '60700',
					country: 'Pakistan'
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest'
		};
		axios
			.post('/orders.json', order)
			.then(res => {
				this.setState({ loading: false, purchasing: false });
			})
			.catch(err => {
				this.setState({ loading: false, purchasing: false });
			});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? (
			'<p>Ingredients can not be loaded</p>'
		) : (
			<Spinner />
		);

		if (this.state.ingredients !== null) {
			burger = (
				<div>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngrdientsHanlder}
						ingredientRemoved={this.removeIngredientHanlder}
						disabled={disabledInfo}
						purchaseable={this.state.purchaseable}
						price={this.state.totalPrice.toFixed(2)}
						ordered={this.purchaseHanlder}
					/>
				</div>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancel={this.purchaseCancelHanlder}
					purchaseContinue={this.purchaseContinueHanlder}
					price={this.state.totalPrice.toFixed(2)}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<div>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHanlder}
				>
					{orderSummary}
				</Modal>
				{burger}
			</div>
		);
	}
}

export default ErrorHanlding(BurgerBuilder, axios);
