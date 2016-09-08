const fs = require('fs');

exports.adminPanel = function(req, res) {
  res.render('admin', {title: '后台管理'})
}

exports.getImg = function(req, res) {
    var path = __dirname + "../../../public/upload"
    console.log("查看 /tmp 目录");
    fs.readdir(path ,function(err, files){
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
  var path = __dirname + "../../../public/upload/" +img
  fs.unlink(path, function(err) {
    if (err) {
      console.error(err);
      res.json({success: 0})
    } else{
      res.json({success: 1})
    }
  })
}
