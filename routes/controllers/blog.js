const Blog = require('../../models/blog');
const Category = require('../../models/category');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');


exports.new = function(req, res) {
  var blogs
  var categories
  var blog
  var id = req.query.id

  Blog.find().populate({
    path: 'category',
    select: 'name'
  }).exec(function(err, blogsData) {
    if (err) console.error(err);
    blogs = blogsData
    // 获取分类
    // blogs.forEach(function(val){
    //   val._category = val.category.name
    // })
    Category.fetch(function(err, categoriesData){
      if (err) console.error(err);
      categories = categoriesData
      // 如果是修改，会有id
      if (id) {
        Blog.findOne({_id: id}, function(err, blogData) {
          if (err) console.error(err);
          blog = blogData
          res.render('admin-blog', {
            title: '新闻资讯',
            blogs: blogs,
            categories: categories,
            blog: blog || {}
          })
        })
      } else{
        res.render('admin-blog', {
          title: '新闻资讯',
          blogs: blogs,
          categories: categories,
          blog: {}
        })
      }
    })
  })
}

// { blogImg:
//    { fieldName: 'blogImg',
//      originalFilename: 'user.jpg',
//      path: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\3ar2d9P45SFqg2MZPgyuuxdp.jpg',
//      headers:
//       { 'content-disposition': 'form-data; name="blogImg"; filename="user.jpg"',
//         'content-type': 'image/jpeg' },
//      size: 7343,
//      name: 'user.jpg',
//      type: 'image/jpeg' } }

exports.saveBlogImg = function(req, res, next) {
  console.log(req.files);
  var imgData =  req.files.blogImg
  var filePath = imgData.path
  var originalFilename = imgData.originalFilename
  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      if (err) console.error(err);
      var timetamp = Date.now()
      var type = originalFilename.split('.')[1]
      var img = timetamp+type
      var newPath = path.join(__dirname, '../../public/upload/', img)
      fs.writeFile(newPath, data, function(err) {
        if (err) console.error(err);
        req.img = img
        next()
      })
    })
  } else {
    next()
  }
}

exports.saveBlog = function(req, res) {
  var id = req.body.blog._id
  var blogObj = req.body.blog
  var localPath
  var _blog

  if (req.img) {
    localPath = path.join('/upload/', req.img)
    blogObj.img = localPath
  }
  console.log(blogObj);
  if(id) {
    Blog.findById(id, function(err, blog) {
      if (err) console.error(err);
      _blog = _.assign(blog, blogObj)
      _blog.save(function(err, blog) {
        if (err) console.error(err);
        res.redirect('/admin/blog')
      })
    })
  } else {
    _blog = new Blog(blogObj)

    var categoryId = blogObj.category
    var categoryName = blogObj.categoryName

    _blog.save(function(err, blog) {
      if (err) console.error(err);

      if (categoryId) {
        Category.findOne({_id: categoryId}, function(err, category) {
          category.blogs.push(blog._id)
          category.save(function(err, category) {
          })
        })
      }
      res.redirect('/admin/blog')
    })
  }
}

exports.removeBlog = function(req, res) {
  var id = req.query.id
  Blog.remove({_id: id}, function(err, okInfo) {
    if (err) {
      console.log(err);
      res.json({success: 0})
    } else {
      res.json({success: 1})

    }
  })
}


// 前端页面
exports.blog = function(req, res) {
  var _categories
  var _blogs
  var perCount = 5
  console.log(req.query.p);
  var page = parseInt(req.query.p, 10) || 0
  var skip = page * perCount || 0

  Category.find(function(err, categories) {
    if (err) console.error(err);
    _categories = categories;
  })

  // if (page){
    Blog.find().populate({
      path: 'category',
      select: 'name'
    }).skip(skip).limit(perCount).exec(function(err, blogsData){
      _blogs = blogsData
      Blog.count(function(err, count) {
        res.render('blog', {
          title: '新闻页面',
          totalPage: Math.ceil(count / perCount),
          blogs: _blogs,
          currentPage: (page + 1),
          categories: _categories,
        })
      })

    })
  // } else {
  //   Blog.find().populate({
  //     path: "category",
  //     select: "name"
  //   }).limit(perCount).exec(function(err, blogsData){
  //     if(err) console.error(err);
  //     _blogs = blogsData
  //
  //     Blog.count(function(err, count) {
  //       if(err) console.error(err);
  //
  //       res.render('blog', {
  //         title: "新闻页面",
  //         totalPage: Math.ceil(count / perCount),
  //         blogs: _blogs,
  //         currentPage: (page + 1)
  //       })
  //     })
  //
  //   })
  // }
}
exports.article = function(req, res) {
  var id = req.query.id
  var _blogs
  var _blog
  var _categories

  Category.find({}, function(err, data) {
    _categories = data;
  })
  Blog.find().limit(3).exec(function(err, blogsData){
    _blogs = blogsData
  })

  Blog.findOne({_id: id}).populate({
    path: 'category',
    select: 'name'
  }).exec(function(err, blogData){
    _blog = blogData
    res.render('article', {
      title: '新闻页面',
      blog: _blog,
      categories: _categories,
      blogs: _blogs,
    })
  })
}
