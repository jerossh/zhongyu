var User = require('../../models/user');
var crypto = require('crypto');
var decipher = crypto.createDecipher('aes192', 'a password');

exports.signUpPage = function(req, res) {
  res.render('signup', {title: '用户登录'})
  // console.log('Cookies: ', req.cookies)
}
exports.loginPage = function(req, res) {
  res.render('login', {title: '用户登录'})
  // console.log('Cookies: ', req.cookies)
}

exports.login = function(req, res) {
  var _user = req.body.user
  console.log(_user);
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.redirect('/login#err')
    } else {
      user = JSON.stringify(user)
      user = JSON.parse(user)
      console.log(user.password);
      var _password = "";
      _password += user.password
      _password = decipher.update(_password, 'hex', 'utf8');
      _password += decipher.final('utf8');
      console.log(_password);

      if (_password = password){
        req.session.user = user
        console.log('Password is matched');
        return res.redirect('/admin')
      }
    }
  })
}


exports.logout = function (req, res) {
  delete req.session.user
  res.redirect('/login')
}

exports.userRequire = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    next()
  }
}
