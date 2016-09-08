const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SlideSchema = new Schema({
  img: String,
  name: String,
  sort: Number
})

SlideSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})               // 加一个大括号什么意思
      .sort('sort')
      .exec(cb)
  }
}

module.exports = SlideSchema
