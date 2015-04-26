'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');

	// Products Routes
	app.route('/api/products')
		.get(products.list)
		//.post(users.requiresLogin, products.create);
		.post(products.create);

	app.route('/api/products/:productId')
		.get(products.read)
		.put(users.requiresLogin, products.hasAuthorization, products.update)
		.delete(users.requiresLogin, products.hasAuthorization, products.delete);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);
};
