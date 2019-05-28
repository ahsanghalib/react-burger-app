import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then(res => {
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFail(err));
			});
	};
};

export const purchsaeInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

const fetchOrderSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

const fetchOrderFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		orders: error
	};
};

const fetchOrderStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrderStart());
		axios
			.get('/orders.json')
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrderSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrderFail(err));
			});
	};
};
