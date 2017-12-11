// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');
var async = require('async');
var request = require('request');

//loading the API key
// var apiKey = process.env.NEW_VAR;

// load the site structural text file into a variable, `content`
var content = fs.readFileSync('/home/ubuntu/workspace/Assignment_05/DataPrevious/m05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// get all the rows on the main table
var ROWS = $('div > table > tbody > tr');
var encontros = [];
var Reunioes;

$(ROWS).each(function (i, elem) {
    
    var SecondCell = $(elem).find('td').eq(1).html().trim().split('<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    <b>');

    $(SecondCell).each(function (j, Sndcell){
        
        var Reunioes = new Object();
        var TimeData = Sndcell;
        var FrstCell = $(elem).find('td').eq(0);
        var HRS = (TimeData.split(' '));
        var RuaSuja = $(FrstCell).contents(0).eq(6).text();
        var RuaLimpa = RuaSuja.substring(0,RuaSuja.indexOf(',', 0)).replace(' (Basement)', '').replace('St.', 'Street').toUpperCase().trim()+', New York, NY'.toUpperCase();
       
        Reunioes.ID = j;
        Reunioes.Instituicao = $(FrstCell).find('h4').text().replace('\'s', 's').replace('Saint', 'St.').toUpperCase().trim();
        Reunioes.NomeReuniaoPrincipal = $(FrstCell).find('b').text().substring(0, ($(FrstCell).find('b').text()).indexOf('-')-1).replace('E', 'East').replace('\'s', " s").toUpperCase().trim();
        Reunioes.NomeReuniaoInteiro = $(FrstCell).find('b').text().replace('\'s', " s").toUpperCase().trim();
        Reunioes.RuaFormatada = RuaLimpa;
        Reunioes.Dia = HRS[0].substring(0, HRS[0].length-1).replace('<b>', '');
        Reunioes.horaInicial = HRS[3];
        Reunioes.horaInicialHoraNUM = +(HRS[3].substring(0,Reunioes.horaInicial.indexOf(':',0)));
        Reunioes.horaInicialMinNUM = +(HRS[3].substring(Reunioes.horaInicial.indexOf(':',0)+1,Reunioes.horaInicial.length));
        Reunioes.PeriodoInicial = HRS[4];
            if (Reunioes.PeriodoInicial == 'PM' && +(HRS[3].substring(0,2)) != 12) 
                {Reunioes.horaInicialHoraNUM_Militar = Reunioes.horaInicialHoraNUM + 12} else if 
                    (Reunioes.PeriodoInicial == 'AM' && +(HRS[3].substring(0,2)) == 12)
                        {Reunioes.horaInicialHoraNUM_Militar = Reunioes.horaInicialHoraNUM - 12} else
                            {Reunioes.horaInicialHoraNUM_Militar = Reunioes.horaInicialHoraNUM}
        Reunioes.horaFinal = HRS[6];
        Reunioes.horaFinalHoraNUM = +(HRS[6].substring(0, Reunioes.horaFinal.indexOf(':',0)));
        Reunioes.horaFinalMinNUM = +(HRS[6].substring(Reunioes.horaFinal.indexOf(':',0)+1,Reunioes.horaFinal.length));
        Reunioes.PeriodoFinal = HRS[7];
            if (Reunioes.PeriodoFinal == 'PM' && +(HRS[3].substring(0,2)) != 12) 
                {Reunioes.horaFinalHoraNUM_Militar = Reunioes.horaFinalHoraNUM + 12} else if 
                    (Reunioes.PeriodoInicial == 'AM' && +(HRS[3].substring(0,2)) == 12)
                        {Reunioes.horaFinalHoraNUM_Militar = Reunioes.horaFinalHoraNUM - 12} else
                            {Reunioes.horaFinalHoraNUM_Militar = Reunioes.horaFinalHoraNUM}
            Reunioes.TipoReuniao = TimeData.substring(TimeData.indexOf('=', 0)-2, TimeData.indexOf('meeting')+7);
        Reunioes.TipoReuniaoDummy = Reunioes.TipoReuniao.substring(0, Reunioes.TipoReuniao.indexOf('=')-1);
        Reunioes.Detalhes =  $(FrstCell).find('div.detailsBox').text().trim();
        
        encontros.push(Reunioes);
        // console.log(Reunioes.RuaFormatada);
    });
    
    // async.eachSeries(encontros, Geolocal, write);


});

// function Geolocal(encontros, callback){
    
//     var addressGoogle = encontros.RuaFormatada;
//     // console.log(addressGoogle);
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressGoogle.split(' ').join('+') + '&keyAIzaSyBpp1-Tt-EfCy6yOQzJ-E4BxfMhyycps_g';
//     // console.log(apiRequest);
//     request(apiRequest, function(err, resp, body) {
//          if (err) {throw err;}
//          console.log(body);
//          encontros.latLong = JSON.parse(body).results.geometry.location;
         
//      });
//      setTimeout(callback, 60000);
// }

function write() {
 console.log(encontros);
fs.writeFile('/home/ubuntu/workspace/FinalAssignment01/aaData.json', JSON.stringify(encontros));
         }

write();


// async.eachSeries(encontros, function(AddressForRequest, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + AddressForRequest.split(' ').join('+') + '&key=' + 'AIzaSyAUU8AXBZzeW0rLxFfVD3umWhZ2lctijS0';
    
//     console.log(apiRequest);
//     // encontros.push(apiRequest);
    
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         var latLong = JSON.parse(body).geometry;
//         var LATLONG_OB = [];
//         LATLONG_OB.push(latLong);
        
//         for (var h = 0; h < LATLONG_OB.length; h++) {
//         var NewLat = LATLONG_OB[h].lat;
//         var NewLong = LATLONG_OB[h].lng;
//         Reunioes.Lat = NewLat;
//         Reunioes.Long = NewLong;
//         }
//         // encontros.push(LATLONG_OB);
//     });
//     setTimeout(callback, 3000);
    
// }, function() {
//         console.log(encontros);
//         fs.writeFile('/home/ubuntu/workspace/FinalAssignment01/aaData.txt', JSON.stringify(encontros));
//         }
// );

// console.log(Object.keys(encontros));
