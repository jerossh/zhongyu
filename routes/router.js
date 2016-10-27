var Index = require('./controllers/index');
var Slide = require('./controllers/slide');
var User = require('./controllers/user');
var Admin = require('./controllers/admin');
var Blog = require('./controllers/blog');
var Category = require('./controllers/category');
var Business = require('./controllers/business');
var Bsnz_category = require('./controllers/bsnz_category');
var Client = require('./controllers/client');


var fs = require('fs')
var path = require('path')

module.exports = function(app){

  // pre handle user
  app.use(function(req, res, next){
    var _user = req.session.user          // 登录后有一个转跳的过程，正好把参数传到这里
      app.locals.user = _user             // The app.locals object is a JavaScript object,
      next()                              // and its properties are local variables within the application.
  })

  // 前端页面
  app.get('/', Index.indexSlide, Index.indexBlog);
  app.get('/about', Index.about);
  app.get('/contact', Index.contact);
  app.get('/blog', Blog.blog);
  app.get('/blog/article', Blog.article);

  // 登录登出
  app.get('/login', User.loginPage)
  app.post('/login', User.login)
  app.get('/logout', User.logout);

  // 后台界面
  app.get('/admin', User.userRequire, Admin.adminPanel)


  // 幻灯片管理
  app.get('/admin/slide', User.userRequire, Slide.new, Slide.change)
  app.post('/admin/newslide',User.userRequire, Slide.saveUploadImg, Slide.saveSlide);
  app.delete('/admin/slide',User.userRequire, Slide.removeSlide)
  // app.delete('/admin/slide', Slider.deleteImg, Slider.removeSlide)

  // 新闻博客
  app.get('/admin/blog', User.userRequire, Blog.new)
  app.post('/admin/blog', User.userRequire, Blog.saveBlogImg, Blog.saveBlog)
  app.delete('/admin/blog', User.userRequire, Blog.removeBlog)

  // 新闻分类
  app.get('/admin/category', User.userRequire, Category.new)
  app.post('/admin/category', User.userRequire, Category.saveCategory)
  app.delete('/admin/category', User.userRequire, Category.removeCategory)

  // 业务模块
  app.get('/admin/business', User.userRequire, Business.new)
  app.post('/admin/business', User.userRequire, Business.saveBlogImg, Business.saveBlog)
  app.delete('/admin/business', User.userRequire, Business.removeBlog)

  // 业务分类
  app.get('/admin/bsnz_category', User.userRequire, Bsnz_category.new)
  app.post('/admin/bsnz_category', User.userRequire, Bsnz_category.saveCategory)
  app.delete('/admin/bsnz_category', User.userRequire, Bsnz_category.removeCategory)

  // 新客户核名
  app.post('/admin/client', Client.saveClient)
  app.get('/admin/clienlist', User.userRequire, Client.clienList)
  app.delete('/admin/clienlist', User.userRequire, Client.removeClient)

  // 用户订阅
  app.post('/admin/rss', Client.saveRss)
  app.get('/admin/rsslist', User.userRequire, Client.rssList)
  app.delete('/admin/rsslist', User.userRequire, Client.removeRss)

  // 多媒体图片管理
  app.get('/admin/images', User.userRequire, Admin.getImg)
  app.delete('/admin/images', User.userRequire, Admin.deleteImg)

  // 用户管理
  app.get('/admin/user', function(req, res) {
    res.render('admin-user', {
      title: '用户系统',
      user: {}
    })
  })
  app.post('/admin/usersubmit', User.userSubmit)

  //
  // // 处理url错误的请求，要放在 路由后面
  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //     var err = new Error('您的页面未找到，尝试一下搜索吧');
  //     err.status = 404;
  //     next(err);
  // });
  // // development error handler
  // // will print stacktrace
  // if (app.get('env') === 'development') {
  //     app.use(function(err, req, res, next) {
  //         res.status(err.status || 500);
  //         res.render('error', {
  //             message: err.message,
  //             error: err,
  //             title: "开发模式 "
  //         });
  //     });
  // }
  // // production error handler
  // // no stacktraces leaked to user
  // app.use(function(err, req, res, next) {
  //     res.status(err.status || 500);
  //     res.render('error', {
  //         message: err.message,
  //         error: {},
  //         title: "生产模式 "
  //     });
  // });

// 结束
}
