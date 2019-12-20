import { NotFoundException } from '../exceptions';

const handle404 = function(req, res, next) {
	next(new NotFoundException());
};

export default handle404;
