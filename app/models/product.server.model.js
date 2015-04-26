'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'You must provide product name',
		trim: true
	},
    category: {
        type: Schema.Types.ObjectId,
        required: 'You must provide category'
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    soldQuantity: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        required: 'You must product product price'
    },
    isNegotiable: {
        type: Boolean,
        default: true
    },
    availableCity: {
        type: String,
        required: 'You must enter city'
    },
    availableLocality: {
        type: String,
        required: 'You must enter locality'
    },
    pickupAddress: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: 'You must provide description'
    },

    //Product purchase details
    monthsUsed: {
        type: Number,
        required: 'You must enter months used'
    },
    availableWarranty: {
        type: Number,
        default: 0,
        required: true
    },
    Condition: {
        type: String,
        required: 'You must provide product condition'
    },

    brand: {
        type: String
    },
    //Post details

    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastupdatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lastupdatedBy: {
        type: Schema.Types.ObjectId,
        required: true
    },

    //media
    thumbnails: [
        {
            imageUrl: {type: String}
        }
    ],
    //Youtube URL
    video: {
        type: String
    }
});

mongoose.model('Product', ProductSchema);
