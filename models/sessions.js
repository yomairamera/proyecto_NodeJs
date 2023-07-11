'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionsSchema = Schema({
    usuario_id: {type: String, require: true, unique: true},
    jwt_info: String
});

module.exports = mongoose.model('sessions', SessionsSchema);