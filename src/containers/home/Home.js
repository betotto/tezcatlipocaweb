import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app-page">{'Counter'}</div>
		);
	}
}

Home.propTypes = {
	
};

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
