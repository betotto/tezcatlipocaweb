import {combineReducers} from 'redux';
import ajaxModule from './ajax/ajaxModule';
import homeModule from './home/homeModule';
import userModule from './user/userModule';
import groupModule from './group/groupModule';
import permissionModule from './permission/permissionModule';

const rootReducer = combineReducers({
	ajaxModule,
	homeModule,
	userModule,
	groupModule,
	permissionModule
});

export default rootReducer;
