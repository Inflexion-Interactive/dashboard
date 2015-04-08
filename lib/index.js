var express = require('express'),
    app = express(),
    Google = require('googleapis'),
    OAuth2 = Google.auth.OAuth2;

var googleParams = {
  clientId: '631823574598-fnu08vmo77publeaac4k2bujanla5uck.apps.googleusercontent.com',
  clientSecret: 'vonTRG01E-0UgFCRatowmK7z',
  redirectUri: 'http://localhost:8888/oauth2callback',
  auth_type: {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/analytics.readonly'
  }
};

var oauth2Client = new OAuth2(googleParams.clientId, googleParams.clientSecret, googleParams.redirectUri);

var googleAnalytics = function(client) {
  return Google.analytics({ version: 'v3', auth: client });
}

app.get('/', function(req, res) {
  res.send('Hey Kevin');
});

app.get('/auth/google', function(req, res) {
  res.redirect(oauth2Client.generateAuthUrl(googleParams.auth_type));
});

app.get('/oauth2callback', function(req, res) {
  oauth2Client.getToken(req.query.code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);

      googleAnalytics(oauth2Client).data.ga.get({
        'ids': 'ga:94523105',
        'start-date': '7daysAgo',
        'end-date': 'today',
        'metrics': 'ga:sessions,ga:visits,ga:timeOnSite,ga:hits,ga:pageviews'
      }, function(err, response) {
        if (!err) {
          res.json({ payload: response });
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = app
