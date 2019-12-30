function TechnicalException(rejection) {
	this.name = 'TechnicalException';
	this.message = 'error.technical.fetch';
	this.status = -900;
	this.stack = new Error().stack;
	this.rejection = rejection;
}

TechnicalException.prototype = Object.create(Error.prototype);
TechnicalException.prototype.constructor = TechnicalException;

export default TechnicalException;
