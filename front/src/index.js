import { initDb } from './initDb';
import { initRouter } from './initRouter';

const config = {
	server: {
		hostname: 'localhost',
		port: '3000'
	},
	database: {
		username: '',
		password: '',
		url: 'localhost:27017',
		name: 'poc'
	}
};

const compute = async () => {
	const { db } = await initDb(config.database);
	await initRouter(config.server, db);
};

compute()
	.then(() => console.log('Everything is ready'))
	.catch(err => console.error('there was an error', err));
