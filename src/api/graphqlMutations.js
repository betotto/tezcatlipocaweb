import axios from 'axios';
import {context} from './configApi';

const newUser = 'mutation($newUser: UserInput!){addUser(newUser:$newUser){id}}';

const GraphMutations = {
	newUser: (newUserData) => {
		return axios.post(context + '/graphql', {
			query: newUser,
			variables: {
				newUser: newUserData
			}
		});
	}
};

export default GraphMutations;
