var mongoose = require('mongoose');
var Bsnz_categorySchema = require('./schemas/bsnz_category')
var Bsnz_category = mongoose.model('Bsnz_category', Bsnz_categorySchema)

module.exports = Bsnz_category
