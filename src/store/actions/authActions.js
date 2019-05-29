import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

const checkAuthTimeOut = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logOut());
		}, expTime * 1000);
	};
};

export const logOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logOut());
		} else {
			const expirationDate = new Date(
				localStorage.getItem('expirationDate')
			);
			if (expirationDate <= new Date()) {
				dispatch(logOut());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeOut(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD-A96MxCTi4PAIC5_2r8f8x-Zt_xLDQSw';
		if (!isSignUp) {
			url =
				'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD-A96MxCTi4PAIC5_2r8f8x-Zt_xLDQSw';
		}
		Axios.post(url, authData)
			.then(response => {
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.data.localId);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);
				dispatch(checkAuthTimeOut(response.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	};
};
