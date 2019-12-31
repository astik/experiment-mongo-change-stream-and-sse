import express from 'express';
import bodyParser from 'body-parser';
import { handle404, handleAuth, handleError } from './middleware';
import cookieParser from 'cookie-parser';
import { UnauthorizedException } from './exceptions';

let streamClients = [];

const getMessages = db => async (req, res) => {
	const data = await db
		.collection('myData')
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
	// unregister client when client close connection
	req.on('close', () => {
		console.log(`${clientId} Connection closed`);
		streamClients = streamClients.filter(c => c.id !== clientId);
	});
};

function sendNewMessageToAllStreamClients(newMessageWrapper) {
	streamClients.forEach(c =>
		c.res.write(`data: ${JSON.stringify(newMessageWrapper)}\n\n`)
	);
}

const postMessages = db => async (req, res) => {
	const { newMessage } = req.body;
	const newMessageWrapper = {
		date: new Date(),
		message: newMessage,
		user: req.user
	};
	const { insertedId } = await db
		.collection('myData')
		.insertOne(newMessageWrapper);
	res.json({ ok: true });
	sendNewMessageToAllStreamClients([{ _id: insertedId, ...newMessageWrapper }]);
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
	return new Promise((resolve, reject) => {
		app
			.listen(port, hostname, function() {
				console.log(`Server is listening on http://${hostname}:${port}`);
				resolve();
			})
			.on('error', err => reject({ rejection: err, errorCode: 200 }));
	});
};
