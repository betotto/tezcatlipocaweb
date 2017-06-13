import React, {PropTypes} from 'react';
import {login} from './messages';
import {connect} from 'react-redux';
import {doLogin} from '../../modules/home/homeModule';
import {Button, Form} from 'semantic-ui-react';
/**
 * The home component of the application.
 */
class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userName: {value: '', isValid: true, name: login.names.userName},
			password: {value: '', isValud: true, name: login.names.password},
		};

		this.onChangeListener = this.onChangeListener.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChangeListener(event) {
		let name = event.target.name,
			value = event.target.value;
		let newState = this.state;
		newState[name].value = value;
		this.setState(newState);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.doLogin(this.state.userName.value,
			this.state.password.value);
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Field>
					<label>{login.labels.userName}</label>
					<input
						name={login.names.userName}
						type="text"
						onChange={this.onChangeListener}
						/>
				</Form.Field>
				<Form.Field>
					<label>{login.labels.password}</label>
					<input id="password"
						name={login.names.password}
						type="password"
						onChange={this.onChangeListener} />
				</Form.Field>
				<Button primary>{login.labels.login}</Button>
			</Form>
		);
	}
}

Login.propTypes = {
	doLogin: PropTypes.func.isRequired
};

function mapStateToProps() {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		doLogin: (userName, password) => dispatch(doLogin(userName, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
