import { EntitySchema } from 'typeorm';

export default new EntitySchema({
	name: 'User',
	tableName: 'Users',
	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true,
		},
		user: {
			type: 'text',
		},
		password: {
			type: 'text',
		},
		refreshToken: {
			type: 'text',
			nullable: true,
		},
	},
});
