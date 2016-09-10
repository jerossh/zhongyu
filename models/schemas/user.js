// db.users.insert({name: 'test',
//     password: 'db3f830fb9361a1dbdc1a61a83581ebb',
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
