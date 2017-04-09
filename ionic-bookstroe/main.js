// 主要思路，node搭建服务器(express) [expressjs.com.cn/4x/api.html]，向各网站api请求数据(request)，然后返回给前端
// 使用 request [https://github.com/request/request] 中间件来模拟请求，然后把数据通过pipe()转接到res,进而返回。
// 因为涉及到url参数解析，所以我们用bodyParser中间件来解析url参数
// 图书与电影的api来自豆瓣[https://developers.douban.com/wiki/?title=guide]
// 音乐的api来自这位同学 [https://api.imjad.cn/]

'use strict';
var request = require('request');
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, 'www')));



// 搜索图书库
  app.use('/api/books', function(req, res) {
    var qs = {
      start: req.query.start,
      count: req.query.count,
      q: req.query.q
    }
    var url = 'https://api.douban.com/v2/book/search?q=' + req.url;
    req.pipe(request({url: url, qs: qs})).pipe(res);
  });

// 搜索单本书籍
  app.use('/api/book/:id', function(req, res) {
    var id = req.params.id;
    var url = 'https://api.douban.com/v2/book/' + id ;
    req.pipe(request(url)).pipe(res);
    console.log('id' +req.url);
  });

//搜索单本图书笔记
  app.use('/self/book/:id', function(req, res) {
    var id = req.params.id;
    var qs = {
      start: req.query.start,
      count: req.query.count,
      q: req.query.q
    }
    var url = 'https://api.douban.com/v2/book/' + id + '/annotations';
    req.pipe(request(url)).pipe(res);
    console.log(req.url);
  });

// 搜索电影名称
  app.use('/movies/:id', function(req, res) {
    var id = req.params.id;
    var qs = {
      start: req.query.start,
      count: req.query.count,
      q: req.query.q
    }
    var url = 'https://api.douban.com/v2/movie/search?q=' + req.url;
    req.pipe(request({url: url, qs: qs})).pipe(res);
  });

// 搜索音乐
  app.use('/music', function(req, res) {
    var qs = {
      type: req.query.type,
      s: req.query.s,
      limit: req.query.count,
      offset: req.query.start,
      br: req.query.br,
      id: req.query.id,
      search_type: req.query.search_type
    }
    var url = 'https://api.imjad.cn/cloudmusic/';
    req.pipe(request({url: url, qs: qs})).pipe(res);
  });


app.listen(3000, function() {
  console.log("it's running on port 3000");
});
