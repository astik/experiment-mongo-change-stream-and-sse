function UnauthorizedException() {
	this.name = 'UnauthorizedException';
	this.message = 'error.unauthorized';
	this.status = 401;
	this.stack = new Error().stack;
}

UnauthorizedException.prototype = Object.create(Error.prototype);
UnauthorizedException.prototype.constructor = UnauthorizedException;

export default UnauthorizedException;
