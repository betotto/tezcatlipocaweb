import axios from 'axios';
import {context} from '../configApi';

const HomeApi = {
	doLogin: (userName, password) => {
		return axios.post(context + '/users/login', {
			userName,
			password
		});
	}
};

export default HomeApi;
