const fs = require('fs');
const path = require('path');

exports.adminPanel = function(req, res) {
  res.render('admin', {title: '后台管理'})
}

exports.getImg = function(req, res) {
    // var path = __dirname + "../../../public/upload"    // 要node 6.5才有效
    var path2 = path.join(__dirname, '../../public/upload')
    console.log('查看 /tmp 目录');

    fs.readdir(path2 ,function(err, files){
       if (err) {
           return console.error(err);
       }
       files.forEach( function (file){
           console.log( file );
       });
       res.render('admin-images', {
         title: '后台管理',
         images: files
       })
    });
}

exports.deleteImg = function(req, res) {
  var img = req.query.id
  var path = __dirname + '../../../public/upload/' +img
  fs.unlink(path, function(err) {
    if (err) {
      console.error(err);
      res.json({success: 0})
    } else{
      res.json({success: 1})
    }
  })
}
