import initialState from '../initialState';
import {beginAjaxCall} from '../ajax/ajaxModule';
import {List} from 'immutable';

import GraphApi from '../../api/graphqlQuerys';

const GET_ALL_GROUPS_SUCCESS = 'GET_ALL_GROUPS_SUCCESS';
const GET_ALL_GROUPS_FAIL = 'GET_ALL_GROUPS_FAIL';
import {
	USER_CATALOGS_SUCCESS,
	USER_CATALOGS_FAIL
} from '../user/userModule';

export default (state = initialState.get('groupModule'), action) => {
	switch(action.type) {
	case GET_ALL_GROUPS_SUCCESS: {
		return state.set('groupsList', new List(action.groupsList));
	}
	case GET_ALL_GROUPS_FAIL: {
		return state.set('groupsList', initialState.get('groupModule').get('groupsList'));
	}
	case USER_CATALOGS_SUCCESS: {
		return state.set('groupsList', new List(action.groupsList));
	}
	case USER_CATALOGS_FAIL: {
		return state.set('groupsList', initialState.get('groupModule').get('groupsList'));
	}
	default: return state;
	}
};

export const getAllGroups = () => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return GraphApi.getAllGroups().then((response) => {
			dispatch({
				type: GET_ALL_GROUPS_SUCCESS,
				groupsList: response.data.data.getAllGroups
			});
		}).catch(error => {
			dispatch({type: GET_ALL_GROUPS_FAIL, error});
		});
	};
};
