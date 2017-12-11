var fs = require('fs');
var config = require('../../sensitive_data/config');

var meetings = JSON.parse(fs.readFileSync('./FinalAssignment01/LatLong.json'));

// Connection URL
var url = config.atlas;

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('flavio');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); //MongoClient.connect