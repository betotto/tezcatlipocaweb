import { Record, List } from 'immutable';

export const GroupRecord = Record({
	name: '',
	description: '',
	screenPermissions: new List(),
	businessPermissions: new List()
});
