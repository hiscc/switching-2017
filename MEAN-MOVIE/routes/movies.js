var Movie = require('../model/movie');
var express = require('express');

var router = express.Router();

// test database
// var a = new Movie({
//   title: 'first movie',
//   director: 'first'
// });
// a.save();

router.route('/movies')
// read all movies
  .get(function(req, res) {
    Movie.find(function(err, movies){
      if (err) {
        res.send(err);
      }
      res.json(movies);
    });
  })

  .post(function(req, res) {
// create movie
    var movie = new Movie(req.body);
    movie.save(function(err) {
      if (err) {
        res.send(err);
      }
    })
  });

router.route('/movies/:id')
  .get(function(req, res) {
  // read movie
    Movie.findOne({_id: req.params.id}, function(err, movie) {
      if (err) {
        res.send(err);
      }
      res.json(movie);
    });
  })
// update movie
  .put(function(req, res) {
    Movie.findOne({_id: req.params.id}, function(err, movie) {
      if (err) {
        res.send(err);
      }
      for(prop in req.body){
        movie[prop] = req.body[prop];
      }
      movie.save(function(err) {
        if (err) {
          res.send(err);
        }
      });
    });
  })

  .delete(function(req, res) {
// delete movie
    Movie.remove({
      _id: req.params.id
    }, function(err, movie) {
      if (err) {
        res.send(err);
      }
    });
  });

  module.exports = router;
