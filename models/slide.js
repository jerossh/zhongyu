const mongoose = require('mongoose');
const SlideSchema = require('./schemas/slide');
var Slide  = mongoose.model('Slide', SlideSchema)

module.exports = Slide
