import initialState from '../initialState';
import {beginAjaxCall} from '../ajax/ajaxModule';

import HomeApi from '../../api/home/endpoints';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export default (state = initialState.get('homeModule'), action) => {
	switch(action.type) {
	case LOGIN_SUCCESS: {
		return state.set('userToken', action.userToken);
	}
	case LOGIN_ERROR: {
		return state.set('userToken', initialState.get('homeModule').get('userToken'));
	}
	default: return state;
	}
};

export const doLogin = (userName, password) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return HomeApi.doLogin(userName, password).then((response) => {
			dispatch({
				type: LOGIN_SUCCESS,
				userToken: response.data.token
			});
		}).catch(error => {
			dispatch({type: LOGIN_ERROR, error});
		});
	};
};
