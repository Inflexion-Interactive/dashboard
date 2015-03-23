var app = require('./lib/index');

app.set('port', (process.env.PORT || 8888));

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
