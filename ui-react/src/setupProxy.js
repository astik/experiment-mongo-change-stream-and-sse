const httpProxyMiddleware = require('http-proxy-middleware');
const { createProxyMiddleware } = httpProxyMiddleware;

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://knut.local:3001/',
			pathRewrite: {
				'^/api': '',
			},
		})
	);
};
