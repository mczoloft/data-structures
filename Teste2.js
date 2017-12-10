var fs = require('fs');
var config = require('../sensitive_data/config');

//credentials stored securely
var db_credentials = new Object();
db_credentials.url = config.atlas.replace('"', '');

var meetings = JSON.parse(fs.readFileSync('FinalAssignment01/aaData.json'));

// console.log(db_credentials.url);
// Connection URL
// var url = 'mongodb://' + process.env.IP + ':27017/aa';
// var url = process.env.ATLAS;

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(db_credentials.url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); 
//MongoClient.connect