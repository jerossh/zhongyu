const Slide = require('../../models/slide');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

exports.new = function(req, res, next) {
  var id = req.query.id
  Slide.fetch(function(err, slides) {
    if (err) console.log(err);
    if(id){
      req.slides = slides
      req.id = id
      next()
    }
    else{
      res.render('admin-slide', {
        title: '幻灯片',
        slides: slides,
        slide: {}
      })
    }
  })
}

exports.change = function(req, res) {
  console.log("这是id：" + req.id);
  Slide.findOne({_id: req.id}, function(err, slide) {
    if (err) console.error(err);
    res.render('admin-slide',{
      title: '幻灯片',
      slides: req.slides,
      slide: slide
    })
  })
}

exports.deleteImg = function(req, res, next) {
  var id = req.query.id

  if (id) {
    Slide.findOne({_id: id}, function(err, slide) {
      console.log("准备删除文件");
      var file = slide.img
      file = file.replace(/\\/g, '/')
      file = path.join(__dirname, '../../', '/public/' + file)
      fs.unlink(file, function(err){
        if(err) console.error(err);
      })
      req.id = id
      next()
    })
  }
}

exports.removeSlide = function(req, res) {
  var id = req.query.id
  Slide.remove({_id: id}, function(err, okInfo) {
    if (err) {
      console.log(err);
      res.json({success: 0})
    } else {
      res.json({success: 1})

    }
  })
}
// { uploadImg:
//  { fieldName: 'uploadImg',
//    originalFilename: 'b1.jpg',
//    path: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\vZION81ayYsjlQQCgAyHIcc6.                          jpg',
//    headers:
//     { 'content-disposition': 'form-data; name="uploadImg"; filename="b1.jpg"',
//       'content-type': 'image/jpeg' },
//    size: 53784,
//    name: 'b1.jpg',
//    type: 'image/jpeg' } }

exports.saveUploadImg = function(req, res, next){

    console.log('req.files: ' +  req.files);
    var imgData = req.files.uploadImg
    var filePath = imgData.path
    var originalFilename = imgData.originalFilename

    if(originalFilename) {
      fs.readFile(filePath, function(err, data) {
        var timetamp = Date.now()
        var type = imgData.type.split('/')[1]
        var img = timetamp + '.' + type
        var newPath = path.join(__dirname, '../../', '/public/upload/' + img)
        console.log("newPath" + newPath);
        fs.writeFile(newPath, data, function(err) {
          req.img = img
          next()
        })
      })
    } else {
      next()
    }

}

exports.saveSlide = function (req, res) {
  var id = req.body.slide._id
  var slideObj = req.body.slide
  var _slide
  var localPath

  if(req.img) {
    localPath = path.join('/upload/' + req.img)
    slideObj.img = localPath
  }

  if (id) {
    // Slide.findOne({_id: id}, function(err, slide) {
    //   if (err) console.error(err);
    //   _slide = _.assign(slide, slideObj)
    //   _slide.save(function(err, slide) {
    //     if (err) console.log(err);
    //     res.redirect('/admin/slide')
    //   })
    // })

    Slide.findById(id, function(err, slide) {
        _slide = _.assign(slide, slideObj)
        _slide.save(function(err, slide) {
          if (err) console.log(err);
          res.redirect('/admin/slide')
        })
    })

  } else {
    _slide = new Slide(slideObj)
    console.log('这里没有问题？');
    _slide.save(function(err, slide) {
      if (err) console.log(err);
      res.redirect('/admin/slide')
    })
  }
// 结束
}
