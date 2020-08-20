import { NotFoundException } from '../exceptions/index.js';

const handle404 = function(req, res, next) {
	next(new NotFoundException());
};

export default handle404;
