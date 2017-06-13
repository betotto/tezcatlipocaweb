import {users} from './users/messages';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getGroupsOptions = (groups) => {
	return groups.map((element) => {
		return {
			key: element.name,
			text: element.description,
			value: element.name
		};
	});
};

export const getPermissions = (permissions) => {
	let businessPermissions = [],
		screenPermissions = [];

	permissions.forEach((element) => {
		if(element.path.startsWith('business:')) {
			businessPermissions.push({
				key: element.path,
				text: element.description,
				value: element.path
			});
		} else {
			screenPermissions.push({
				key: element.path,
				text: element.description,
				value: element.path
			});
		}
		return {
			businessPermissions,
			screenPermissions
		};
	});
	return {
		businessPermissions,
		screenPermissions
	};
};

export const validateUser = (userData) => {
	userData.errorMessages = [];
	userData.invalidForm = false;
	if(userData.userName.value === '') {
		userData.userName.isError = true;
		userData.invalidForm = true;
		userData.errorMessages.push(users.errors.userName);
	}
	if(!emailRegex.test(userData.email.value)) {
		userData.email.isError = true;
		userData.invalidForm = true;
		userData.errorMessages.push(users.errors.email);
	}
	return userData;
};

export const getGroupsObject = (groupsList, selectedGroups) => {
	let groups = [];
	selectedGroups.forEach(element => {
		groups.push(groupsList.find(group => {
			return group.name === element;
		}));
	});
	return groups;
};

export const getPermissionsObject = (permissionsList, selectedPermissions) => {
	let permisssions = [];
	selectedPermissions.forEach(element => {
		permisssions.push(permissionsList.find(permission => {
			return permission.path === element;
		}));
	});
	return permisssions;
};

export const getUserFormState = (isEditing, currentUser) => {
	let state = {
		invalidForm: false,
		errorMessages: [],
		userName: {value: '', isError: false, name: users.names.userName},
		email: {value: '', isError: false, name: users.names.email}
	};
	if(isEditing && currentUser !== null && currentUser !== undefined) {
		state.groupList = currentUser.groups.map((elem)=> elem.name);
		state.businessPermissions = currentUser.businessPermissions.map((elem)=> elem.path);
		state.screenPermissions = currentUser.screenPermissions.map((elem)=> elem.path);
		state.userName.value = currentUser.userName;
		state.email.value = currentUser.email;
	} else {
		state.groupList = [];
		state.businessPermissions = [];
		state.screenPermissions = [];
	}
	return state;
}