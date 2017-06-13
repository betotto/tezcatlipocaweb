import React, {PropTypes} from 'react';
import {Provider, connect} from 'react-redux';
import {Dimmer, Header, Icon} from 'semantic-ui-react';
import LightRouter from './router';
import Home from './containers/home/Home';
import Users from './containers/users/User';
import Groups from './containers/groups/Group';
import Permission from './containers/permissions/Permission';
import HeaderApp from './containers/home/components/Header';
import Menu from './containers/home/components/Menu';
import Footer from './containers/home/components/Footer';
import Login from './containers/home/Login';
/**
 * The router of the application, it uses navigo instead of React-router, only basics ruotes.
 */
class App extends React.Component {

	constructor(props) {
		super(props);
		this.router = new LightRouter({
			pathRoot: 'index.html',
			type: 'hash'
		});
		this.state = {
			currentPage: <Home />,
			selected: 'home'
		};
	}
	/**
	 * The configuration of the routes
	 */
	componentDidMount() {
		this.router.add('', () => {
			this.setState({
				currentPage: <Home />,
				selected: 'home'
			});
		});

		this.router.add('/users', () => {
			this.setState({
				currentPage: <Users />,
				selected: 'users'
			});
		});

		this.router.add('/groups', () => {
			this.setState({
				currentPage: <Groups />,
				selected: 'groups'
			});
		});

		this.router.add('/permissions', () => {
			this.setState({
				currentPage: <Permission />,
				selected: 'permissions'
			});
		});

		this.router.run();

		window.onhashchange = ((event) => {
			event.preventDefault();
			this.router.run();
		}).bind(this);
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<main>
					<Dimmer active={this.props.loading}>
						<Header as="h5" icon inverted>
							<Icon loading name="refresh" />
							{'Loading...'}
						</Header>
					</Dimmer>
					<HeaderApp />
					{this.props.userToken !== null && (
						<section className="current-page">
							<aside>
								<Menu selected={this.state.selected} />
							</aside>
							{this.state.currentPage}
						</section>
					)}
					{this.props.userToken === null && (
						<Login />
					)}
					<Footer />
					<div>{'perro' + this.props.loading}</div>
				</main>
			</Provider>
		);
	}
}

App.propTypes = {
	store: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	userToken: PropTypes.string
};

function mapStateToProps(state) {
	return {
		userToken: state.homeModule.get('userToken'),
		loading: state.ajaxModule > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default  connect(mapStateToProps, mapDispatchToProps)(App);
