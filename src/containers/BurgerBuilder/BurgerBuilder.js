import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHanlding from '../../ErrorHanlding/ErrorHanlding';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	};

	purchaseHanlder = () => {
		if(this.props.isAuthenticated) {
			this.setState({ purchasing: true });			
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHanlder = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHanlder = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.props.error ? (
			<p
				style={{
					textAlign: 'center',
					color: 'red',
					textTransform: 'uppercase',
					fontWeight: 'bold'
				}}
			>
				Ingredients can not be loaded
			</p>
		) : (
			<Spinner />
		);

		if (this.props.ings !== null) {
			burger = (
				<div>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHanlder}
						isAuth={this.props.isAuthenticated}
					/>
				</div>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancel={this.purchaseCancelHanlder}
					purchaseContinue={this.purchaseContinueHanlder}
					price={this.props.price}
				/>
			);
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

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredients(ingName)),
		onIngredientRemoved: ingName =>
			dispatch(actions.removeIngredients(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorHanlding(BurgerBuilder, axios));
