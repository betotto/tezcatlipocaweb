import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Header, Icon, Button, Container} from 'semantic-ui-react';
import TableUsers from './components/TableUsers';
import UserForm from './components/UserForm';
import {getGroupsOptions, getPermissions, getGroupsObject, getPermissionsObject} from '../utils';

import {getCatalogs, newUser, getUserById} from '../../modules/user/userModule';

class User extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: 'list',
			editing: false
		};

		this.selectUser = this.selectUser.bind(this);
		this.addUser = this.addUser.bind(this);
		this.cancelAction = this.cancelAction.bind(this);
		this.createUser = this.createUser.bind(this);
	}

	componentDidMount() {
		this.props.getCatalogs();
	}

	addUser(event) {
		event.preventDefault();
		this.setState({
			page: 'userForm',
			editing: false
		});
	}

	selectUser(event) {
		event.preventDefault();
		this.props.getUserById(event.target.id);
		this.setState({
			page: 'userForm',
			editing: true
		});
	}

	createUser(userData) {
		let newUserData = {
			userName: userData.userName.value,
			email: userData.email.value,
			groups: getGroupsObject(this.props.groupsList.toArray(), userData.groupList),
			screenPermissions: getPermissionsObject(this.props.permissionsList.toArray(),
				userData.screenPermissions),
			businessPermissions: getPermissionsObject(this.props.permissionsList.toArray(),
				userData.businessPermissions)
		};
		this.props.newUser(newUserData);
		this.props.getCatalogs();
		this.setState = ({
			page: 'list'
		});
	}

	cancelAction() {
		this.props.getCatalogs();
		this.setState({
			page: 'list',
			editing: false
		});
	}
	render() {
		let permissions = getPermissions(this.props.permissionsList.toArray());
		return (
			<div className="app-page">
				<Header as="h2">
					<Icon name="settings" />
					<Header.Content>
						{'Users'}
						<Header.Subheader>
							{this.state.page === 'list' && 'All the configured users'}
							{this.state.page === 'newUser' && 'Add new user'}
						</Header.Subheader>
					</Header.Content>
				</Header>
				{this.state.page === 'list' && (
					<Container textAlign="right" className="noWidth">
						<Button.Group labeled size="small">
							<Button positive icon="plus" content="Add User" onClick={this.addUser} />
						</Button.Group>
					</Container>
				)}
				{this.state.page === 'list' && (
					<TableUsers usersList={this.props.usersList.toArray()}
						selectUser={this.selectUser} />
				)}
				{this.state.page === 'userForm' && (
					<UserForm groupsList={getGroupsOptions(this.props.groupsList.toArray())}
						businessPermissions={permissions.businessPermissions}
						screenPermissions={permissions.screenPermissions}
						createUser={this.createUser}
						cancelAction={this.cancelAction}
						isEditing={this.state.editing}
						currentUser={this.props.currentUser} />
				)}
			</div>
		);
	}
}

User.propTypes = {
	usersList: PropTypes.object.isRequired,
	groupsList: PropTypes.object.isRequired,
	permissionsList: PropTypes.object.isRequired,
	currentUser: PropTypes.object,
	getCatalogs: PropTypes.func.isRequired,
	getUserById: PropTypes.func.isRequired,
	newUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		usersList: state.userModule.get('usersList'),
		groupsList: state.groupModule.get('groupsList'),
		permissionsList: state.permissionModule.get('permissionsList'),
		currentUser: state.userModule.get('currentUser')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getCatalogs: () => dispatch(getCatalogs()),
		newUser: (userData) => dispatch(newUser(userData)),
		getUserById: (userId) => dispatch(getUserById(userId))
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
