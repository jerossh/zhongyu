// db.users.insert({name: 'zhongyu',
//     password: '10704a3385a6493adb338cc2fbb5c8f7',     // lb1988
//     code: '001',
// })

var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId


var UserSchema = new Schema({
  name: String,
  password: String,
  code: Number
})

module.exports = UserSchema
