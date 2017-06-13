import axios from 'axios';
import {context} from './configApi';

const allUsersQuery = 'query{getAllUsers{id,userName,email}}';
const getUserByIdQuery = `query($userId: Int!){getUserById(userId: $userId) {
						id,userName,email,groups {name},screenPermissions {path},
						businessPermissions {path}}}`;
const allGroupsQuery = `query{getAllGroups{name,description,
							screenPermissions{path,description},
							businessPermissions{path,description}}}`;
const allPermissionsQuery = 'query{getAllPermissions{path,description}}';
const userCatalogsQuery = `query{getAllUsers{id,userName,email}
								getAllGroups {name,description,
								screenPermissions{path,description},
								businessPermissions{path,description}},
								getAllPermissions {path,description}}`;


const GraphQuerys = {
	getAllUsers: () => {
		return axios.post(context + '/graphql', {
			query: allUsersQuery,
			variables: null
		});
	},
	getAllGroups: () => {
		return axios.post(context + '/graphql', {
			query: allGroupsQuery,
			variables: null
		});
	},
	getAllPermissions: () => {
		return axios.post(context + '/graphql', {
			query: allPermissionsQuery,
			variables: null
		});
	},
	getUserCatalogs: () => {
		return axios.post(context + '/graphql', {
			query: userCatalogsQuery,
			variables: null
		});
	},
	getUserById: (userId) => {
		return axios.post(context + '/graphql', {
			query: getUserByIdQuery,
			variables: {userId}
		});
	}
};

export default GraphQuerys;
