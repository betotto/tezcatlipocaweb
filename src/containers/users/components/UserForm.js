import React, {PropTypes} from 'react';
import {users} from '../messages';
import { Button, Dropdown, Form, Input, Message } from 'semantic-ui-react';
import {validateUser, getUserFormState} from '../../utils';

class UserForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = getUserFormState(props.isEditing, props.currentUser),
		this.handleChange = this.handleChange.bind(this);
		this.textChangeListener = this.textChangeListener.bind(this);
		this.changeGroup = this.changeGroup.bind(this);
		this.changeBusinessPermission = this.changeBusinessPermission.bind(this);
		this.changeScreenPermission = this.changeScreenPermission.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isEditing === true) {
			this.setState(getUserFormState(nextProps.isEditing, nextProps.currentUser));
		}
	}

	textChangeListener(event) {
		let name = event.target.name,
			value = event.target.value;
		let newState = this.state;
		newState[name].value = value;
		newState[name].isError = false;
		this.setState(newState);
	}

	handleChange(e, {value}) {
		this.setState({
			value
		});
	}

	changeGroup(e, {value}) {
		this.setState({
			groupList: value
		});
	}

	changeBusinessPermission(e, {value}) {
		this.setState({
			businessPermissions: value
		});
	}

	changeScreenPermission(e, {value}) {
		this.setState({
			screenPermissions: value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		let newState = validateUser(this.state);
		if(newState.invalidForm) {
			this.setState(newState);
		} else {
			this.props.createUser(newState);
		}
	}

	render() {
		return (
			<Form as="form" onSubmit={this.handleSubmit}>
				<Form.Group widths="equal">
					<Form.Field control={Input}
						error={this.state.userName.isError}
						value={this.state.userName.value}
						name={users.names.userName}
						label={users.labels.userName}
						placeholder={users.labels.userName}
						onChange={this.textChangeListener}
						disabled={this.props.isEditing} />
					<Form.Field control={Input}
						error={this.state.email.isError}
						value={this.state.email.value}
						name={users.names.email}
						label={users.labels.email}
						placeholder={users.labels.email}
						onChange={this.textChangeListener}
						disabled={this.props.isEditing} />
				</Form.Group>
				{this.state.invalidForm === true &&(
					<Message negative={this.state.invalidForm} list={this.state.errorMessages} />
				)}
				<Form.Field>
					<label>{users.labels.group}</label>
					<Dropdown placeholder={users.labels.group} fluid multiple selection
						options={this.props.groupsList}
						value={this.state.groupList}
						onChange={this.changeGroup} />
				</Form.Field>
				<Form.Field>
					<label>{users.labels.businessPermissions}</label>
					<Dropdown placeholder={users.labels.businessPermissions} fluid multiple selection
						options={this.props.businessPermissions}
						value={this.state.businessPermissions}
						onChange={this.changeBusinessPermission} />
				</Form.Field>
				<Form.Field>
					<label>{users.labels.screenPermissions}</label>
					<Dropdown placeholder={users.labels.screenPermissions} fluid multiple selection
						options={this.props.screenPermissions}
						value={this.state.screenPermissions}
						onChange={this.changeScreenPermission} />
				</Form.Field>
				<Form.Field>
					<Button type="submit" primary>{'Add'}</Button>
					<Button type="button" secondary onClick={this.props.cancelAction}>
						{'Cancel'}
					</Button>
				</Form.Field>
			</Form>
		);
	}
}

UserForm.propTypes = {
	groupsList: PropTypes.array.isRequired,
	businessPermissions: PropTypes.array.isRequired,
	screenPermissions: PropTypes.array.isRequired,
	isEditing: PropTypes.bool,
	currentUser: PropTypes.object,
	createUser: PropTypes.func.isRequired,
	cancelAction: PropTypes.func.isRequired
};

export default UserForm;
