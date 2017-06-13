import React, {PropTypes} from 'react';

class Group extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app-page">
				{'Grupo'}
			</div>
		);
	}
}

Group.propTypes = {
};

export default Group;
