import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHanlding from '../../ErrorHanlding/ErrorHanlding';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

	componentDidMount() {
		this.props.onFetchOrders();
	}

	render() {
		let orderLoading = null;
		if (this.props.loading) {
			orderLoading = <Spinner />;
		} else {
			orderLoading = this.props.orders.map(order => {
				return (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				);
			});
		}

		return <div>{orderLoading}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	}
}

const mapDisptachToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders()),
	};
}

export default connect(mapStateToProps, mapDisptachToProps)(ErrorHanlding(Orders, axios));
