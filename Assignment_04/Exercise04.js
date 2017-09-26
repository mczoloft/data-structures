var request = require('request');

// IN MONGO exists a database 'data-structures-class' with a collection 'aaMeetings'
var dbName = 'data-structure-class'; // name of Mongo database (created in the Mongo shell)
var collName = 'aaMeetings'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data of previous exercise
// Insert the list of meetings (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/mczoloft/data-structures/master/Assignment%2003/exercise03.txt', function(error, response, body) {
    var aaData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(aaData);
        db.close();

        console.log(aaData); //just checking if aaData was returning my JSON file data. it is, but I don't know if the DB is being filled? 

    }); //MongoClient.connect

}); //request

