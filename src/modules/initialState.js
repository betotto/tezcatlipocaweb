
import {Map, List} from 'immutable';

let initialState = new Map()
	.set('ajaxModule', 0)
	.set('homeModule', new Map()
		.set('userToken', 'vava'))
	.set('userModule', new Map()
		.set('usersList', new List([])
		.set('currentUser', null)))
	.set('groupModule', new Map()
		.set('groupsList', new List([])))
	.set('permissionModule', new Map()
		.set('permissionsList', new List([])));

export default initialState;
