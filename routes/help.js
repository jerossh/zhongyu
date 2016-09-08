// express 封装了多种 http 请求方式，我们主要只使用 get 和 post 两种，即 app.get() 和 app.post() 。
// app.get() 和 app.post() 的第一个参数都为请求的路径，第二个参数为处理请求的回调函数，回调函数有两个参数分别是 req 和 res，代表请求信息和响应信息 。路径请求及对应的获取路径有以下几种形式：



// req.query
// GET /search?q=tobi+ferret
req.query.q
// => "tobi ferret"

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "desc"
req.query.shoe.color
// => "blue"
req.query.shoe.type
// => "converse"


// req.body
// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"
req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
req.body.name
// => "tobi"


// req.params
// GET /user/tj
req.params.name
// => "tj"

// GET /file/javascripts/jquery.js
req.params[0]
// => "javascripts/jquery.js"



// req.param(name)
// ?name=tobi
req.param('name')
// => "tobi"

// POST name=tobi
req.param('name')
// => "tobi"

// /user/tobi for /user/:name
req.param('name')
// => "tobi"
