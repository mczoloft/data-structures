// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('/home/ubuntu/workspace/data/m05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// get all the rows on the main table
var Txt1st = $('div > table > tbody > tr');

// then, we go through each row,...
$(Txt1st).each(function(i, elem) {

    // ... we find the cells within the first column, by their index position...
    var FirstCell = $(elem).find('td').get(0);

    // ... and load their content as a variable (the street address, as it appears, is the 6th element inside them?)...
    var Address = $(FirstCell).contents().eq(6);

    // ... that was long. Print it out the text results, and remove the trailing whitespace.
    console.log($(Address).text().trim());

    //I thought of using .split to remove everything after the comma, but it gives me an array, which wasn't this assignment goal.
    //Also didn't fully resolve the problem; there was a (Basement) inside a street address still
    // console.log($(Address).text().trim().split(',', 1));


});