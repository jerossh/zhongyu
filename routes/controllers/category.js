const Category = require('../../models/category');
var _ = require('lodash');

exports.new = function(req, res) {
  var id = req.query.id
  var categories



  Category.fetch(function(err, categoriesData) {
    if (err) console.error(err);
    categories = categoriesData
    if(id) {
      Category.findOne({_id: id}, function(err, category) {
        if (err) console.log(err);
          res.render('admin-category', {
            title: '新闻分类管理',
            category: category,
            categories: categories
          })
        })

    } else {
      res.render('admin-category', {
        title: '新闻分类管理',
        category: {},
        categories: categories
      })
    }
  })
}
exports.saveCategory = function(req, res) {
  var categoryObj = req.body.category
  var _category
  var id = categoryObj.id

  if (id) {
    Category.findOne({_id: id}, function(err, category) {
      if (err) console.log(err);
      _category = _.assignIn(category, categoryObj)
      _category.save(function(err) {
        if (err) console.log(err);
        res.redirect('/admin/category')
      })
    })
  } else {
    _category = new Category(categoryObj)
    _category.save(function(err) {
      if (err) console.error(err);
      res.redirect('/admin/category')
    })
  }
}

exports.removeCategory = function(req, res) {
  var id = req.query.id

  Category.remove({_id: id}, function(err, okInfo) {
    console.log(okInfo);
    if (err) {
      console.log(err);
      res.json({success: 0})
    } else {
      res.json({success: 1})

    }
  })
}
