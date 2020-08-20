import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { UnauthorizedException } from './exceptions/index.js';
import { handle404, handleAuth, handleError } from './middleware/index.js';

let streamClients = [];

const getCollection = db => db.collection('myData');

const getMessages = db => async (req, res) => {
	const data = await getCollection(db)
		.find(
			{},
			{
				sort: { date: -1 }
			}
		)
		.limit(10)
		.toArray();
	if (req.headers.accept !== 'text/event-stream') {
		res.json(data);
		return;
	}
	// prepare SSE
	const headers = {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
		'Cache-Control': 'no-transform'
	};
	res.writeHead(200, headers);
	// send initial data
	res.write(`data: ${JSON.stringify(data)}\n\n`);
	// register client
	const clientId = Date.now();
	const newClient = {
		id: clientId,
		res
	};
	streamClients.push(newClient);
	console.log(`[${clientId}] Added to clients`);
	// unregister client when client close connection
	req.on('close', () => {
		console.log(`[${clientId}] Connection closed`);
		streamClients = streamClients.filter(c => c.id !== clientId);
	});
};

const sendNewMessagesToAllStreamClients = newMessagesWrapper => {
	streamClients.forEach(c =>
		c.res.write(`data: ${JSON.stringify(newMessagesWrapper)}\n\n`)
	);
};

const initMessageWatcher = db => {
	console.log('initMessageWatcher');
	const changeStream = getCollection(db).watch();
	changeStream.on('change', next => {
		console.log('new message in database', next);
		sendNewMessagesToAllStreamClients([next.fullDocument]);
	});
};

const postMessages = db => async (req, res) => {
	const { newMessage } = req.body;
	const newMessageWrapper = {
		date: new Date(),
		message: newMessage,
		user: req.user
	};
	const { insertedId } = await getCollection(db).insertOne(newMessageWrapper);
	res.json({
		ok: true,
		newMessage: {
			_id: insertedId,
			...newMessageWrapper
		}
	});
};

const login = (req, res) => {
	const { login } = req.body;
	if (!login) {
		throw new UnauthorizedException();
	}
	res.cookie('login', login, {
		httpOnly: true,
		secure: false,
		path: '/',
		maxAge: 24 * 60 * 60 * 1000
	});
	res.json({ ok: true });
};

const logout = (req, res) => {
	res.cookie('login', '', {
		httpOnly: true,
		secure: false,
		path: '/',
		maxAge: -1
	});
	res.json({ ok: true });
};

export const initRouter = ({ hostname, port }, db) => {
	const app = express();
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(handleAuth);
	app.route('/messages').get(getMessages(db));
	app.route('/messages').post(postMessages(db));
	app.route('/login').post(login);
	app.route('/logout').post(logout);
	app.use(handle404);
	app.use(handleError);
	initMessageWatcher(db);
	return new Promise((resolve, reject) => {
		app
			.listen(port, hostname, function() {
				console.log(`Server is listening on http://${hostname}:${port}`);
				resolve();
			})
			.on('error', err => reject({ rejection: err, errorCode: 200 }));
	});
};
