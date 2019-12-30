function BadRequestException(errors) {
	this.name = 'BadRequestException';
	this.stack = new Error().stack;
	this.status = 400;
	this.errors = Object.entries(errors).reduce(function(
		accu,
		[fieldKey, error]
	) {
		accu[fieldKey] = error.message;
		return accu;
	},
	{});
}

BadRequestException.prototype = Object.create(Error.prototype);
BadRequestException.prototype.constructor = BadRequestException;

export default BadRequestException;
