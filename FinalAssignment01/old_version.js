// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var request = require('request');

//loading the API key
var apiKey = process.env.NEW_VAR;

// load the site structural text file into a variable, `content`
var content = fs.readFileSync('/home/ubuntu/workspace/Assignment_05/DataPrevious/m05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// get all the rows on the main table
var Txt1st = $('div > table > tbody > tr');

var Teste = [];
var Teste2 = [];
var Teste3 = [];
var Teste4 = [];
var Teste5 = [];
var Teste6 = [];
var Teste7 = [];
var Teste8 = [];
var Teste9 = [];
var Teste10 = [];

// We go through each row, and get Names, Street Address and extra Details for the 1st Column. Push them to separate arrays.
$(Txt1st).each(function (i, elem) {
    var FirstCell = $(elem).find('td').get(0);
   
    var Institution = $(FirstCell).find('h4');
    var WrongAddress = $(FirstCell).contents(0).eq(6);
    var FinalAddress = WrongAddress.text().trim();
    var Details = $(FirstCell).find('div.detailsBox');

    Teste.push(Institution.text().replace('\'s', " s").trim());
    Teste2.push(FinalAddress.substring(0, FinalAddress.indexOf(',')) + ', New York, NY');
    Teste10.push(Details.text().trim());
});

// We go through each row in the second column, and get Names, Street Address and extra Details. Push them to separate arrays.
$(Txt1st).each(function (i, elem) {
    // ... we find the cells within the second column, by their index position...
    var SecondCell = $(elem).find('td').get(1);

    // ... and load their content as a variable (the street address, as it appears, is the 6th element inside them?)...
    var DaysWeek = $(SecondCell).contents(0).eq(1);
    var FirstTime = $(SecondCell).contents(0).eq(2);
    var LastTime = $(SecondCell).contents(0).eq(4);
    var TypeEncounter = $(SecondCell).contents(0).eq(7);

    // ... that was long. Print it out the text results, and remove the trailing whitespace.
    Teste3.push(FirstTime.text().trim());
    Teste4.push(LastTime.text().trim());
    Teste5.push(DaysWeek.text().replace('From', ' ').trim());
    Teste6.push(TypeEncounter.text().trim());
});

var Meetings = [];

//eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(Teste2, function(AddressForRequest, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + AddressForRequest.split(' ').join('+') + '&key=' + apiKey;
    for (var i = 0; i < Teste.length; i++) {
    Meetings[i] = {'ID': i, 
    'Institute': Teste[i], 
    'Street': Teste2[i], 
    'Days': Teste5[i], 
    'Starting_Hour': Teste3[i].slice(0, 5).trim(), 
    'End_Hour': Teste4[i].slice(0, 5).trim(),
    'TimeSlot': Teste3[i].slice(-2),
    'Type': Teste6[i].replace(' meeting', '').trim(),
    'Lat': Teste8[i],
    'Long': Teste9[i],
    'Details': Teste10[i]
    }; 
}
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        var latLong = JSON.parse(body).results[0].geometry.location;
        Teste7.push(latLong);
        for (var i = 0; i < Teste7.length; i++) {
        var NewLat = Teste7[i].lat;
        var NewLong = Teste7[i].lng;
        Teste8.push(NewLat);
        Teste9.push(NewLong);
    }
    });
    setTimeout(callback, 400);
}, function() {
    console.log(Teste8);
    console.log(Meetings);
    fs.writeFile('/home/ubuntu/workspace/Assignment_05/DataNew/exercise05.txt', JSON.stringify(Meetings));
});