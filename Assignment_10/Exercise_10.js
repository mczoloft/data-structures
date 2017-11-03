var express = require('express'),
    app = express();
const { Pool } = require('pg');
var config = require('../../sensitive_data/config');


// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'mczoloft';
db_credentials.host = config.AWSRDS_EP;
db_credentials.database = 'sensorfp';
db_credentials.password = config.AWSRDS_PW;
db_credentials.port = 5432;

app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth,
             EXTRACT(HOUR FROM sensortime AT TIME ZONE 'America/New_York') as sensorhour,
             count(*) as num_obs, 
             max(workMood) as max_work, 
             min(workMood) as min_work,
             max(workLight) as max_light, 
             min(workLight) as min_light
             FROM sensordata 
             GROUP BY sensormonth, sensorday, sensorhour;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.listen(3000, function() {
    console.log('Server listening...');
});