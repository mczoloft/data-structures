var express = require('express'),
    app = express();
var fs = require('fs');
var atual = require('moment-timezone');
const { Pool } = require('pg');
var config = require('../../sensitive_data/config');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'mczoloft';
db_credentials.host = config.AWSRDS_EP;
db_credentials.database = 'sensorfp';
db_credentials.password = config.AWSRDS_PW;
db_credentials.port = 5432;

//Mongo Variables
var MongoClient = require('mongodb').MongoClient;
var collName = 'flavio';
var url = config.atlas;

// HTML wrappers for AA data
var partOne = fs.readFileSync("index1.txt");
var partTwo = fs.readFileSync("index2.txt");


app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM realTime AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM realTime AT TIME ZONE 'America/New_York') as sensormonth,
             EXTRACT(HOUR FROM realTime AT TIME ZONE 'America/New_York') as sensorhour,
             count(*) as num_obs, 
             max(workMood) as max_work, 
             min(workMood) as min_work,
             max(workLight) as max_light, 
             min(workLight) as min_light
             FROM studyRoom 
             GROUP BY sensorday, sensormonth, sensorhour;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

console.log(url);

app.get('/aa', function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) { return console.dir(err); }

        var Hoje = atual.tz(new Date(), "America/New_York").days();
        var DiaHoje;
        var DiaAmanha;
        if (Hoje == 0) {DiaHoje = 'Sunday'; DiaAmanha = 'Monday'}
        else if (Hoje == 1) {DiaHoje = 'Monday'; DiaAmanha = 'Tuesday'}
        else if (Hoje == 2) {DiaHoje = 'Tuesday'; DiaAmanha = 'Wednesday'}
        else if (Hoje == 3) {DiaHoje = 'Wednesday'; DiaAmanha = 'Thursday'}
        else if (Hoje == 4) {DiaHoje = 'Thursday'; DiaAmanha = 'Friday'}
        else if (Hoje == 5) {DiaHoje = 'Friday'; DiaAmanha = 'Saturday'}
        else if (Hoje == 6) {DiaHoje = 'Saturday'; DiaAmanha = 'Sunday'}
        
        var HoraAtual = atual.tz(new Date(), "America/New_York").hours();
        var HoraFinal = 6;

        var collection = db.collection(collName);

        collection.aggregate([ // start of aggregation pipeline
            // match by day and time
            { $match : 
                { $or : [
                    { $and: [
                        { Dia : DiaHoje } , { horaInicialHoraNUM_Militar : { $gte: HoraAtual } }
                    ]},
                    { $and: [
                        { Dia : DiaAmanha } , { horaInicialHoraNUM_Militar : { $lte: HoraFinal } }
                    ]}
                ]}
            },
            
            // group by meeting group
            { $group : { _id : {
                latLong: "$latLong",
                meetingName : "$NomeReuniaoInteiro",
                meetingAddress : "$RuaFormatada",
                },
                    meetingDay : { $push : "$Dia" },
                    meetingStartTime : { $push : "$horaInicial" }, 
                    meetingStartPeriod : { $push : "$PeriodoInicial" }, 
                    meetingEndTime : { $push : "$horaFinal" },
                    meetingEndPeriod : { $push : "$PeriodoFinal" }, 
                    meetingType : { $push : "$TipoReuniao" }
            }
            },
            
            // group meeting groups by latLong
            {
                $group : { _id : { 
                    latLong : "$_id.latLong"},
                    meetingGroups : { $push : {groupInfo : "$_id", meetingDay : "$meetingDay", meetingStartTime : "$meetingStartTime", meetingStartPeriod : "$meetingStartPeriod", meetingEndTime : "$meetingEndTime", meetingEndPeriod : "$meetingEndPeriod", meetingType : "$meetingType" }}
                }
            }

        ]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) { console.log(err) }

            else {
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(partOne);
                res.write(JSON.stringify(docs));
                res.end(partTwo);
            }
            db.close();
        });
    });

});

app.listen(3000, function() {
    console.log('Server listening...');
});