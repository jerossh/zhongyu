const mongoose = require('mongoose');
const RssSchema = require('./schemas/rss');
var Rss  = mongoose.model('Rss', RssSchema)

module.exports = Rss
