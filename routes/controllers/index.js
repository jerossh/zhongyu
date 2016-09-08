const Slide = require('../../models/slide');
const Blog = require('../../models/blog');

exports.indexSlide = function(req, res, next) {
  var slides
  Slide.fetch(function(err, slidesData) {
    if(err) console.log(err);
    slides = slidesData
    res.slides = slides
    next()
  })

}
exports.indexBlog = function(req, res) {
  var blogs
  Blog.fetchThree(function( err, BlogsData) {
    if(err) console.log(err);
    blogs = BlogsData
    res.render('index', {
      title: '中誉会计',
      slides: res.slides,
      blogs: blogs
    })
  })
}

exports.contact = function(req, res) {
    res.render('contact', {
      title: '联系我们'
    })
}
exports.about = function(req, res) {
    res.render('about', {
      title: '关于我们'
    })
}
