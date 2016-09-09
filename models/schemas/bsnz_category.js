const mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var Bsnz_categorySchema = new Schema({
  name: String,
  intro: String,
  business: [{
    type: ObjectId,
    ref: 'Business'
  }],
  meta: {
    creatAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 这个被取消了  是回调被干掉了吗？
// BlogSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.creatAt = this.meta.updateAt = Date.now()
//   }
//   this.meta.updateAt = Date.now()
// })
Bsnz_categorySchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.creatAt':-1})         // _id 中包含了事件的算法
      .exec(cb)
  }
}

module.exports = Bsnz_categorySchema
