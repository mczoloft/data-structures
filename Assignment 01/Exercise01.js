// nothing seems wrong with this version (the console prints everthing fine), but it only writes the last site (m10)
// var request = require('request');
// var fs = require('fs');
// var SiteNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];

// function GetSiteGetTXT() {
//   request(FullSite, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         fs.writeFileSync(FullTXT, body);
//       }
//       else {
//         console.error('request failed');
//       }
//       });
// }

// for (var i = 0; i < SiteNumber.length; i++) {
  
//     var FullSite = 'http://visualizedata.github.io/datastructures/data/m' + SiteNumber[i] + '.html';
//     var FullTXT = '/home/ubuntu/workspace/data/m' + SiteNumber[i] + '.txt';  
//     GetSiteGetTXT(i);
//     console.log(FullSite);
//     console.log(FullTXT);

// }

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m1.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m02.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m2.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m03.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m03.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m04.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m04.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m05.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m05.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m06.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m06.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m07.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m07.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m08.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m08.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m09.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m09.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m10.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/m10.txt', body);
  }
  else {console.error('request failed')}
})