import { UnauthorizedException } from '../exceptions';

function handleAuth(req, res, next) {
	if (req.url.startsWith('/login')) {
		return next();
	}
	const login = req.cookies && req.cookies.login;
	if (!login) {
		throw new UnauthorizedException();
	}
	req.user = login;
	return next();
}

export default handleAuth;
