var express = require('express'),
    google = require('googleapis'),
    OAuth2 = google.auth.OAuth2;
    GoogleAnalytics = google.analytics('v3');
    app = express();

var internals = {
  google: {
    clientId: '637295642313-as4l5l0bj7kvtm1scedqu71gnhtqc2aa.apps.googleusercontent.com',
    clientSecret: 'gLg9yThvrMBh23oIOaj8_KG4',
    redirectUri: 'http://localhost:3000/oauth2callback',
    auth_type: {
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/analytics.readonly'
    }
  }
};

var oauth2Client = new OAuth2(
    internals.google.clientId,
    internals.google.clientSecret,
    internals.google.redirectUri
);

app.get('/', function(req, res) {
  res.send('Hey Kevin');
});

app.get('/google', function(req, res) {
  res.json({ status: 'ok' });
});

app.get('/googleapi', function(req, res) {
  res.send(oauth2Client.generateAuthUrl(internals.google.auth_type));
});

module.exports = app
