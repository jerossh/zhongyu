const User = require('../../models/user');
// const crypto = require('crypto');
// const decipher = crypto.createDecipher('aes192', 'a password');
const bcrypt = require('bcrypt');

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';



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
      // user = JSON.stringify(user)
      // user = JSON.parse(user)
      // var _password = '';
      // _password += user.password
      // _password = decipher.update(_password, 'hex', 'utf8');
      // _password += decipher.final('utf8');
      console.log(1);
      user.comparePassword(password, function(err, isMatch) {
        console.log(4);
           if (err) {
             console.log(err)
           }
          console.log(5);
           if (isMatch) {
             req.session.user = user
             console.log('Password is matched');
             return res.redirect('/admin')
           }
           else {
             return res.redirect('/signin')
           }
         })

    }
  })
}

exports.logout = function (req, res) {
  delete req.session.user
  res.redirect('/login')
}

exports.userSubmit = function (req, res) {
  const user = req.body.user;
  const _user = new User(user);

  console.log('1');
  _user.save(function(err, user) {
    console.log(6);
    if (err) console.error(err);
    res.redirect('/admin/user')
  })
}

exports.userRequire = function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    next()
  }
}
