var request = require('request');

var collName = 'reunioesAA';

request('https://raw.githubusercontent.com/mczoloft/data-structures/master/FinalAssignment01/aaData.json', function(error, response, body) {
    var meetingData = JSON.parse(body);

    var url = 'mongo "mongodb://cluster0-shard-00-00-rzdcl.mongodb.net:27017,cluster0-shard-00-01-rzdcl.mongodb.net:27017,cluster0-shard-00-02-rzdcl.mongodb.net:27017/flavio?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username santf655 --password KRN5vzHGr2OkQfGh';
    
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(meetingData);
        db.close();
    });
});






// var fs = require('fs');
// var config = require('../sensitive_data/config.js');

// //credentials stored securely
// var db_credentials = 'mongo "mongodb://cluster0-shard-00-00-rzdcl.mongodb.net:27017,cluster0-shard-00-01-rzdcl.mongodb.net:27017,cluster0-shard-00-02-rzdcl.mongodb.net:27017/flavio?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username santf655 --password KRN5vzHGr2OkQfGh';

// var meetings = JSON.parse(fs.readFileSync('FinalAssignment01/aaData.json'));

// console.log(db_credentials);
// // Connection URL
// // var url = 'mongodb://' + process.env.IP + ':27017/aa';
// // var url = process.env.ATLAS;

// // Retrieve
// var MongoClient = require('mongodb').MongoClient; // npm install mongodb

// MongoClient.connect(db_credentials, function(err, db) {
//     if (err) {return console.dir(err);}

//     var collection = db.collection('flavio');

//     // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
//     collection.insert(meetings);
//     db.close();

// }); 
// //MongoClient.connect