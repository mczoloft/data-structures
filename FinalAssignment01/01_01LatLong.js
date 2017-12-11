var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var apiKey = 'AIzaSyANzKhcTdGs6tXK6fmWYRR4_0hOH7B18J0';

request('aaData.json', function(error, response, body) {
    var meetingswithoutlatLong = JSON.parse(body);

  var meetingsData = [];
  async.eachSeries(meetingswithoutlatLong, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.RuaFormatada.split(' ').join('+') + '&key=AIzaSyANzKhcTdGs6tXK6fmWYRR4_0hOH7B18J0';
    var thisMeeting = new Object;
    thisMeeting = value;
    request(apiRequest, function(err, resp, body) {
      if (err) {throw err;}
      thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
      meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 250);
    }, function() {
      require('fs').writeFile('LatLong.json', JSON.stringify(meetingsData), function (err) {
        if (err) {
          console.error('error');
        }
      }
    );
  });

});