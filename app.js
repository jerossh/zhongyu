var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongodb')     // 用于本地 session
var logger = require('morgan');                  // HTTP request logger middleware for node.js
var multipart = require('connect-multiparty');
var app = express();

//for the offline storage
var session = require('express-session')
var cookieParser = require('cookie-parser')
var dburl = 'mongodb://localhost/zhongyukuaiji'

// database
 mongoose.connect(dburl)
// db.on('error', console.error.bind(console,'连接错误:'));    报错，not a function

// program config
// app.set('port', process.env.PORT || 3000);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/images/favicon.png'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(multipart())

app.use(cookieParser())         //session 依赖的中间件  存储sessionid
app.use(session({               //用来本地存储信息 store 对象
  secret: 'imoocj',
  resave:false,
  saveUninitialized:true,
  store: new MongoStore({
    url: dburl,
    collection: 'sessions'      // 这条不懂，为什么是sessions是
  })
}))

app.locals.moment = require('moment')

//tooltip
if ('development' === app.get('env')){              // 如果是开发环境
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
  mongoose.set('debug', true)                       // 数据库请求信息
}

// app.use('/', routes);
// app.use('/users', users);
require('./routes/router')(app);

app.listen(app.get('port'))

module.exports = app;
