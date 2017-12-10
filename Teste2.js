var fs = require('fs');
var config = require('../sensitive_data/config.js');

//credentials stored securely
var db_credentials = config.atlas;

var meetings = JSON.parse(fs.readFileSync('FinalAssignment01/aaData.json'));

console.log(db_credentials);
// Connection URL
// var url = 'mongodb://' + process.env.IP + ':27017/aa';
// var url = process.env.ATLAS;

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(db_credentials, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('flavio');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); 
//MongoClient.connect