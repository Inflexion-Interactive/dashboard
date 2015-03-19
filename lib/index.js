var express = require('express'),
    app = express();

app.get('/', function(req, res) {
  res.send('Hey Kevin');
});

app.get('/google', function(req, res) {
  res.json({ status: 'ok' });
});

module.exports = app
