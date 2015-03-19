var express = require('express'),
    app = express();

app.get('/', function(req, res) {
  res.send('Hey Kevin');
});

app.listen(3000);
