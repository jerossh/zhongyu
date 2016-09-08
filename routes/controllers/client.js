const Client = require('../../models/client');
const Rss = require('../../models/rss');

exports.saveClient = function(req, res) {
  var clientObj = req.body.client
  var _client
    _client = new Client(clientObj)
    _client.save(function(err) {
      if (err) console.error(err);
      res.redirect('..');
    })

}

exports.clienList = function(req, res) {
  var clients
  Client.fetch(function(err, clientsData) {
    if (err) console.error(err);

    clients = clientsData
    res.render('admin-client', {
      title: "客户查询列表",
      clients: clients
    })
  })
}

exports.removeClient = function(req, res) {
  var id = req.query.id
  Client.remove({_id: id}, function(err, okInfo) {
    console.log(okInfo);
    if (err) {
      console.log(err);
      res.json({success: 0})
    } else {
      res.json({success: 1})
    }
  })
}

exports.saveRss = function(req, res) {
  var rssObj = req.body.rss
  var _rss
    _rss = new Rss(rssObj)
    _rss.save(function(err) {
      if (err) console.error(err);
      res.redirect('/contact');
    })

}

exports.rssList = function(req, res) {
  var rsses
  Rss.fetch(function(err, rssesData) {
    if (err) console.error(err);

    rsses = rssesData
    res.render('admin-rss', {
      title: "客户订阅列表",
      rsses: rsses
    })
  })
}

exports.removeRss = function(req, res) {
  var id = req.query.id
  Rss.remove({_id: id}, function(err, okInfo) {
    console.log(okInfo);
    if (err) {
      console.log(err);
      res.json({success: 0})
    } else {
      res.json({success: 1})
    }
  })
}
