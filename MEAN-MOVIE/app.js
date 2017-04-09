var express = require('express');
var bodyParser = require('body-parser');
var movies = require('./routes/movies');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + ''));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//data api path
app.use(movies);

var connectionString = 'mongodb://mean:mean@ds113668.mlab.com:13668/mean';

mongoose.connect(connectionString);
var conn = mongoose.connection;

// conn.on('error', console.error.bind(console, 'connection error'))
// conn.once('open', function() {
//   console.log('database ready');
// });

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function() {
  console.log('your app is running on port 8000');
})
