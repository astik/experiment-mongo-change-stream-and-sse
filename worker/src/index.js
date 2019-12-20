import starwars from 'starwars';
import { initDb } from './initDb';

const config = {
	db: {
		username: '',
		password: '',
		url: 'localhost:27017',
		name: 'poc'
	}
};

const createData = async db => {
	await db.collection('myData').insertOne({
		date: new Date(),
		message: starwars(),
		user: 'starwars bot'
	});
	console.log('data was inserted into database');
};

const logData = async db => {
	const data = await db
		.collection('myData')
		.find(
			{},
			{
				sort: { date: -1 }
			}
		)
		.limit(2)
		.toArray();
	console.log('data', data);
};

const compute = async () => {
	const { db } = await initDb(config.db);
	await createData(db);
	await logData(db);
};

compute()
	.catch(err => console.error('there was an error', err))
	.then(() => process.exit(0));
