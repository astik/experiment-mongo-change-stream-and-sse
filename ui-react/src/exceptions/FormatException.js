function FormatException() {
	this.name = 'FormatException';
	this.message = 'error.format';
	this.status = -901;
	this.stack = new Error().stack;
}

FormatException.prototype = Object.create(Error.prototype);
FormatException.prototype.constructor = FormatException;

export default FormatException;
