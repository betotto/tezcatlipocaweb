import React, {PropTypes} from 'react';
import { Icon, Table } from 'semantic-ui-react';

const TableUsers = ({usersList, selectUser}) => {
	let users = usersList.map((user, index) => {
		return (
			<Table.Row key={index}>
				<Table.Cell>{user.userName}</Table.Cell>
				<Table.Cell>{user.email}</Table.Cell>
				<Table.Cell id={user.id} textAlign="center" onClick={selectUser} selectable className="get-user-detail">
					{'Edit '}<Icon name="arrow right" />
				</Table.Cell>
			</Table.Row>
		);
	});
	return (
		<Table celled>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>{'User name'}</Table.HeaderCell>
					<Table.HeaderCell>{'Email'}</Table.HeaderCell>
					<Table.HeaderCell>{'Edit'}</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{users}
			</Table.Body>
		</Table>
	);
};

TableUsers.propTypes = {
	usersList: PropTypes.array.isRequired,
	selectUser: PropTypes.func.isRequired
};

export default TableUsers;
