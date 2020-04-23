var http = require('http');
var fs = require('fs');
var io = require('socket.io')
var extract = require('./extract');
var wss = require('./websockets-server');
var path = require('path');


var handleError = function (err, res) {  
    var test = 'error.html';
    var errPath = __dirname + '/app/' + test;

    fs.readFile(errPath, function (err, data) {
      if (err) {
          throw err;
          
        } else {    
          res.end(data);
        }  
  });
   
    
    

    
};

var server = http.createServer(function (req, res) {  
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);

    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res);
            return;
          } else {    
            res.end(data);
          }  
    });
});
server.listen(3000);