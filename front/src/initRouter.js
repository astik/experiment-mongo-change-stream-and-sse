import express from 'express';
import bodyParser from 'body-parser';
import { handle404, handleAuth, handleError } from './middleware';
import cookieParser from 'cookie-parser';
import { UnauthorizedException } from './exceptions';

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
	res.json(data);
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
