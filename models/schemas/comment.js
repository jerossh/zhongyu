const mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var commentSchema = new Schema({
  blog: {type: ObjectId, ref: 'Blog'},
  from: {type: ObjectId, ref: 'User'},
  reply: [{
    from: {type: ObjectId, ref: 'User'},
    to: {type: ObjectId, ref: 'User'},
    content: String,
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
commentSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.creatAt':-1})         // _id 中包含了时间的算法
      .exec(cb)
  }
}

module.exports = commentSchema
