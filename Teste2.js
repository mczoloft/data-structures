var fs = require('fs');

var meetings = JSON.parse(fs.readFileSync('./FinalAssignment01/aaData.txt'));

// Connection URL
var url = 'mongodb://santf655:KRN5vzHGr2OkQfGh@cluster0-shard-00-00-rzdcl.mongodb.net:27017,cluster0-shard-00-01-rzdcl.mongodb.net:27017,cluster0-shard-00-02-rzdcl.mongodb.net:27017/flavio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection('flavio');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    collection.insert(meetings);
    db.close();

}); //MongoClient.connect