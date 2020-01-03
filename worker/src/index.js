import starwars from 'starwars';
import { initDb } from './initDb';

const config = {
	db: {
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		url: process.env.DATABASE_URL,
		name: process.env.DATABASE_NAME
	},
	tempoInSecond: process.env.TEMPO_IN_SECOND
};

console.log('config used:', config);

const createData = async db => {
	const data = {
		date: new Date(),
		message: starwars(),
		user: 'starwars bot'
	};
	await db.collection('myData').insertOne(data);
	console.log('data was inserted into database', data);
};

const compute = async () => {
	const { db } = await initDb(config.db);

	setInterval(async () => {
		await createData(db);
	}, config.tempoInSecond * 1000);
};

compute()
	.then(() => console.log('Everything is ready'))
	.catch(err => console.error('there was an error', err));
