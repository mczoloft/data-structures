var request = require('request');
const { Client } = require('pg');
var config = require('../../sensitive_data/config');

// PARTICLE PHOTON
var device_id = config.device_id;
var access_token = config.access_token;
var particle_variable = 'newvalues';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'mczoloft';
db_credentials.host = config.AWSRDS_EP;
db_credentials.database = 'sensorfp';
db_credentials.password = config.AWSRDS_PW;
db_credentials.port = 5432;

var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var workMood = JSON.parse(device_json_string).Knob;
        var workLight = JSON.parse(device_json_string).Light;
        // console.log(workLight);

        // // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO studyRoom VALUES (" + workMood + ",DEFAULT," + workLight + ");";
        console.log(thisQuery); // for debugging

        // // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// write a new row of sensor data every minute
setInterval(getAndWriteData, 6000);
