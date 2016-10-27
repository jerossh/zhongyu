// db.users.insert({name: 'test',
//     password: 'db3f830fb9361a1dbdc1a61a83581ebb',
//     code: '001',
// })

const bcrypt = require('bcrypt');
var saltRounds = 7;    // 加盐次数，不要太高

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  name: {
    unique: true,   // 唯一
    type: String
  },
  password: String,
  role: {
    type: Number,
    default: 0
  },
  meta: {
    creatAt:{
      type:Date,
      default: Date.now()
    },
    updateAt:{
      type:Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save',function(next) {
  console.log('2');
  var user = this
  if (this.isNew) {
    this.meta.creatAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  console.log('3');
  bcrypt.genSalt(saltRounds , function(err, salt){
    if (err) return next(err)
    console.log(4);
    bcrypt.hash(user.password, salt, function(err, hash){
      console.log(4.5);
      if(err) return next(err)
      user.password = hash
      console.log('5');
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function(_password, cb) {
    console.log(2);
    bcrypt.compare(_password, this.password, function(err, isMatch){
      if (err) return cb(err)
      console.log(3);
      cb(null, isMatch)
    })
  }
}

// UserSchema.statics = {
//   fetch: function(cb){   //取出目前数据库所有的数据
//     return this
//       .find({})
//       .sort('meta.updateAt')             //排序
//       .exec(cb)
//   },
//   findById: function(id, cb) {   //用来查询单条数据
//     return this
//       .findOne({_id: id})
//       .exec(cb)
//   }
// }

module.exports = UserSchema;
