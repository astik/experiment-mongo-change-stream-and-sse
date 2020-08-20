import mongoDb from 'mongodb';

const { MongoClient } = mongoDb;

export const initDb = ({ username, password, url, name }) => {
	let urlmongo = `mongodb://${url}/${name}`;
	if (!!username) {
		urlmongo = `mongodb://${username}:${password}@${url}/${name}`;
	}
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	return new MongoClient(urlmongo, options)
		.connect()
		.then(client => ({ client, db: client.db(name) }))
		.catch(err => Promise.reject({ rejection: err, errorCode: 100 }));
};
