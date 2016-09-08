const mongoose = require('mongoose');
const ClientSchema = require('./schemas/client');
var Client  = mongoose.model('Client', ClientSchema)

module.exports = Client
