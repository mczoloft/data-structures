// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');

// npm install request
var request = require('request'); 

//loading the API key
var apiKey = process.env.NEW_VAR;

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('/home/ubuntu/workspace/data/m05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var meetingsData = [];

// get all the rows on the main table
var Txt1st = $('div > table > tbody > tr');

var FinalAddress = [];

var CleanAddress = [];

// then, we go through each row,...
$(Txt1st).each(function(i, elem) {

    // ... we find the cells within the first column, by their index position...
    var FirstCell = $(elem).find('td').get(0);

    // ... and load their content as a variable (the street address, as it appears, is the 6th element inside them?)...
    var Address = $(FirstCell).contents().eq(6).text().trim();

    FinalAddress.push(Address);

});

$(FinalAddress).each(function (i, elem) {

var x1 = FinalAddress[i].toString();
var x2 = x1.substring(0, x1.indexOf(','));
var x3 = x2 + ', New York, NY';
var x4 = x3.split(' ').join('+');

CleanAddress.push(x4);

});

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(CleanAddress, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
    fs.writeFile('exercise03.txt', JSON.stringify(meetingsData));
});


