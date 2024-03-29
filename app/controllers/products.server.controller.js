'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	var product = new Product(req.body);
	product.createdBy = req.user.id;
    req.assert('name', 'You must enter a name').notEmpty();
    req.assert('category', 'You must enter a valid email address').notEmpty();
    req.assert('quantity', 'Password must be between 8-20 characters long').notEmpty().isInt();
    req.assert('price', 'You must enter a valid price').isInt();
    req.assert('availableCity', 'You must enter a name').notEmpty().len(3,50);
    req.assert('availableLocality', 'You must enter a valid email address').notEmpty().len(3,50);
    req.assert('pickupAddress', 'Password must be between 8-20 characters long').notEmpty().len(10,500);
    req.assert('description', 'Username cannot be more than 20 characters').len(50);
    req.assert('monthsUsed', 'Passwords do not match').notEmpty().isInt();
    req.assert('availableWarranty', 'You must enter a valid email address').notEmpty().isInt();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }
	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * Show the current Product
 */
exports.read = function(req, res) {
	res.jsonp(req.product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
	var product = req.product ;

	product = _.extend(product , req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
	var product = req.product ;

	product.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * List of Products
 */
exports.list = function(req, res) { 
	Product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(products);
		}
	});
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) { 
	Product.findById(id).populate('user', 'displayName').exec(function(err, product) {
		if (err) return next(err);
		if (! product) return next(new Error('Failed to load Product ' + id));
		req.product = product ;
		next();
	});
};

/**
 * Product authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.product.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
