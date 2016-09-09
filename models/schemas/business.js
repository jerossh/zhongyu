const mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var BusinessSchema = new Schema({
  title: String,
  article: String,
  intro: String,
  img: {
    type: String,
    default: '/images/b3.jpg'
  },
  category: {
    type: ObjectId,
    ref: 'Bsnz_category'
  },
  pv: {
    type: Number,
    default: 0
  },
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
BusinessSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.creatAt':-1})         // _id 中包含了事件的算法
      .exec(cb)
  },

  fetchThree: function(cb) {
    return this
      .find({})
      .limit(3)
      .sort({'meta.creatAt':-1})         // _id 中包含了事件的算法
      .exec(cb)
  }
}

module.exports = BusinessSchema
