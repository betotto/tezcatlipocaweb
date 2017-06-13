import React, {PropTypes} from 'react';
import { Menu, Icon } from 'semantic-ui-react';


const MenuApp = ({selected}) => {
	return (
		<Menu vertical borderless>
			<Menu.Item onClick={() => document.location.href = '#'}
				data-selected={selected === 'home'}>
				<Icon name="home" />
				<Menu.Header>{'Home'}</Menu.Header>
			</Menu.Item>
			<Menu.Item onClick={() => document.location.href = '#/users'}
				data-selected={selected === 'users'}>
				<Icon name="address card" />
				<Menu.Header>{'Users'}</Menu.Header>
			</Menu.Item>
			<Menu.Item onClick={() => document.location.href = '#/groups'}
				data-selected={selected === 'groups'}>
				<Icon name="sitemap" />
				<Menu.Header>{'Groups'}</Menu.Header>
			</Menu.Item>
			<Menu.Item onClick={() => document.location.href = '#/permissions'}
				data-selected={selected === 'permissions'}>
				<Icon name="privacy" />
				<Menu.Header>{'Permissions'}</Menu.Header>
			</Menu.Item>
		</Menu>
	);
};

MenuApp.propTypes = {
	selected: PropTypes.string.isRequired
};

export default MenuApp;
