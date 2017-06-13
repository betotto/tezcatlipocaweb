import InitialState from '../initialState';
import {beginAjaxCall} from '../ajax/ajaxModule';
import {List} from 'immutable';

import GraphApi from '../../api/graphqlQuerys';
import GraphMutationApi from '../../api/graphqlMutations';

const initialState = InitialState.get('userModule');

const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';
export const USER_CATALOGS_SUCCESS = 'USER_CATALOGS_SUCCESS';
export const USER_CATALOGS_FAIL = 'USER_CATALOGS_FAIL';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAIL = 'GET_USER_FAIL';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';

export default (state = initialState, action) => {
	switch(action.type) {
	case GET_ALL_USERS_SUCCESS: {
		return state.set('usersList', new List(action.usersList));
	}
	case GET_ALL_USERS_FAIL: {
		return state.set('usersList', initialState.get('usersList'));
	}
	case USER_CATALOGS_SUCCESS: {
		return state.set('usersList', new List(action.usersList));
	}
	case USER_CATALOGS_FAIL: {
		return state.set('usersList', initialState.get('usersList'));
	}
	case GET_USER_SUCCESS: {
		return state.set('currentUser', action.user);
	}
	case GET_USER_FAIL: {
		return state.set('currentUser', initialState.get('currentUser'));
	}
	case ADD_USER_SUCCESS: {
		return state.set('lastUser', action.lastUserId);
	}
	case ADD_USER_FAIL: {
		return state.set('lastUser', initialState.get('lastUser'));
	}
	default: return state;
	}
};

export const getAllUsers = () => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphApi.getAllUsers().then((response) => {
			dispatch({
				type: GET_ALL_USERS_SUCCESS,
				usersList: response.data.data.getAllUsers
			});
		}).catch(error => {
			dispatch({type: GET_ALL_USERS_FAIL, error});
		});
	};
};

export const getCatalogs = () => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphApi.getUserCatalogs().then((response) => {
			dispatch({
				type: USER_CATALOGS_SUCCESS,
				usersList: response.data.data.getAllUsers,
				groupsList: response.data.data.getAllGroups,
				permissionsList: response.data.data.getAllPermissions,
			});
		}).catch(error => {
			dispatch({type: USER_CATALOGS_FAIL, error});
		});
	};
};

export const getUserById = (userId) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphApi.getUserById(userId).then((response) => {
			dispatch({
				type: GET_USER_SUCCESS,
				user: response.data.data.getUserById
			});
		}).catch(error => {
			dispatch({type: GET_USER_FAIL, error});
		});
	};
};

export const newUser = (userData) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphMutationApi.newUser(userData).then((response) => {
			dispatch({
				type: ADD_USER_SUCCESS,
				lastUser: response.data.data.addUser.id
			});
		}).catch(error => {
			dispatch({type: ADD_USER_FAIL, error});
		});
	};
};
