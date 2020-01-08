import { initDb } from './initDb';
import { initRouter } from './initRouter';

const config = {
	server: {
		hostname: process.env.SERVER_HOSTNAME,
		port: process.env.SERVER_PORT
	},
	database: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		url: process.env.DATABASE_URL,
		name: process.env.DATABASE_NAME
	}
};

console.log('config used:', config);

const compute = async () => {
	const { db } = await initDb(config.database);
	await initRouter(config.server, db);
};

compute()
	.then(() => console.log('Everything is ready'))
	.catch(err => console.error('there was an error', err));
