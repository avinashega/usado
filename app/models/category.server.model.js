'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
    parent  : {
        type :  Schema.Types.ObjectId,
        ref : 'Category'
    },
    name: {
        type: String,
        required: 'Please fill Category name',
        trim: true
    },
    icon: {
        type: String,
        required: true
    },
    defaultImage: {
        type: String,
        required: true
    },
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
        ref: 'User',
        required: true
    },
    lastupdatedBy: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }
});

mongoose.model('Category', CategorySchema);
