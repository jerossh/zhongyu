const User = require('../../models/user');
// const crypto = require('crypto');
// const decipher = crypto.createDecipher('aes192', 'a password');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



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

  // 这里
  bcrypt.compare(myPlaintextPassword, 'hash1', function(err, res) {
      // res == true
  });

  User.findOne({name: name}, function(err, user) {
    if (err) console.error(err);

    if (!user) {
      res.redirect('/login#err')
    } else {
      user = JSON.stringify(user)
      user = JSON.parse(user)
      console.log(password);

      var _password = '';

      _password += user.password
      console.log(_password);
      var type = typeof _password
      console.log(type);
      // _password = decipher.update(_password, 'hex', 'utf8');
      // _password += decipher.final('utf8');
      // console.log('倒立着');
      // console.log(_password);

      if (_password === password){
        req.session.user = user
        console.log('Password is matched');
        return res.redirect('/admin')
      }
    }
  })
}


exports.logout = function (req, res) {
  delete req.session.user
  res.redirect('/')
}

exports.userRequire = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    next()
  }
}
