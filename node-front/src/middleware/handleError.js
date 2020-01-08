import { NotFoundException, UnauthorizedException } from '../exceptions';

const handleError = function(err, req, res, next) {
	if (err instanceof UnauthorizedException) {
		res.status(401).send({ error: 'error.unauthorized' });
	} else if (err instanceof NotFoundException) {
		res.status(404).send({ error: 'error.not.found' });
	} else {
		next(err);
	}
};

export default handleError;
