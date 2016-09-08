const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var RssSchema = new Schema({
  name: String,
  mail: String,
  createAt:{
    type: Date,
    default: Date.now()
  }
})

RssSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.creatAt':-1})         // _id 中包含了事件的算法
      .exec(cb)
  },

}

module.exports = RssSchema
