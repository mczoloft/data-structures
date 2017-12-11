// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

var encontros = [];
var filenumber = ['m01','m02','m03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10'];

for (var i = 0; i < filenumber.length; i++) {
    var filename = '/home/ubuntu/workspace/FinalAssignment01/data/' + filenumber[i] + '.txt';
    var content = fs.readFileSync(filename);

    // load `content` into a cheerio object
    var $ = cheerio.load(content);
    
    // get all the rows on the main table
    var ROWS = $('div > table > tbody > tr');
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
    
        });
        
    
    });
}

function write() {
 console.log(encontros);
fs.writeFile('/home/ubuntu/workspace/FinalAssignment01/aaData.json', JSON.stringify(encontros));
         }

write();