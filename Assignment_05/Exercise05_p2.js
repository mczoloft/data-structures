var fs = require('fs');
var request = require('request');

var dbName = 'data-structure-class';
var collName = 'aaMeetings';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Re-entered the new collection with all the data with the code below:
// request('https://raw.githubusercontent.com/mczoloft/data-structures/master/Assignment_05/DataNew/exercise05.txt', function(error, response, body) {
//     var aaData = JSON.parse(body);

//     // Connection URL
//     var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

//     // Retrieve
//     var MongoClient = require('mongodb').MongoClient; 

//     MongoClient.connect(url, function(err, db) {
//         if (err) {return console.dir(err);}

//         var collection = db.collection(collName);

//         // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
//         collection.insert(aaData);
//         db.close();

//         console.log(aaData); //just checking if aaData was returning my JSON file data. it is, but I don't know if the DB is being filled? 

//     }); //MongoClient.connect

// }); //request

// Aggregation code
MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // Select Tuesdays starting at 7pm
    // I just found out that I had to convert the hours from strings to dates or numbers
    collection.aggregate([{ $match : { Days : "Tuesdays", TimeSlot : "PM" }}]).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('/home/ubuntu/workspace/Assignment_05/DataNew/mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect