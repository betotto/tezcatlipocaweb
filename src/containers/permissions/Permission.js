import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Permission extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app-page">
				{'Permission'}
			</div>
		);
	}
}

Permission.propTypes = {
};

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Permission);
