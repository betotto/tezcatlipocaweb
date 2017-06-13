import initialState from '../initialState';
import {beginAjaxCall} from '../ajax/ajaxModule';
import {List} from 'immutable';

import GraphApi from '../../api/graphqlQuerys';

const GET_ALL_PERMISSION_SUCCESS = 'GET_ALL_PERMISSION_SUCCESS';
const GET_ALL_PERMISSION_FAIL = 'GET_ALL_PERMISSION_FAIL';
import {
	USER_CATALOGS_SUCCESS,
	USER_CATALOGS_FAIL
} from '../user/userModule';

export default (state = initialState.get('permissionModule'), action) => {
	switch(action.type) {
	case GET_ALL_PERMISSION_SUCCESS: {
		return state.set('permissionsList', new List(action.usersList));
	}
	case GET_ALL_PERMISSION_FAIL: {
		return state.set('permissionsList', initialState.get('permissionModule').get('permissionsList'));
	}
	case USER_CATALOGS_SUCCESS: {
		return state.set('permissionsList', new List(action.permissionsList));
	}
	case USER_CATALOGS_FAIL: {
		return state.set('permissionsList', initialState.get('permissionModule').get('permissionsList'));
	}
	default: return state;
	}
};

export const getAllPermissions = () => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphApi.getAllPermissions().then((response) => {
			dispatch({
				type: GET_ALL_PERMISSION_SUCCESS,
				usersList: response.data.data.getAllPermissions
			});
		}).catch(error => {
			dispatch({type: GET_ALL_PERMISSION_FAIL, error});
		});
	};
};
