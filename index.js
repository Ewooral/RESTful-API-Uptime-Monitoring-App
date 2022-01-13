/**
 * Boahen Owusu-Ewooral Boahen
 * Primary file for the RESTful API
 */

// Dependencies
 var http = require('http');
 var https = require('https');
 var url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;
 var config = require('./config');
 var fs = require('fs');
 var handlers = require('./lib/handlers');
 var _data = require('./lib/data');


 // TEST 
 // CREATE DATA
 //@TODO: Remove this before building the real server 
//  _data.create('test', 'newFile', {'foo' : 'bar'}, function(err){
//     if(!err){
//          console.log('Success!');
//       }
//       else{
//          console.log('Error!', err);
//       }
//    });

// TEST
// READ DATA FROM FILE
 //@TODO: Remove this before building the real server
// _data.read('test', 'newFile1', function(err, data){
//     if(!err){
//          console.log('Success!\n','This was the data => ', data);
//       }
//       else{
//          console.log('Error!', err);
//       }
//    });

// TEST
// UPDATE DATA IN A FILE
 //@TODO: Remove this before building the real server
// _data.update('test', 'newFile', {"name" : "Ewooral-Owusu"}, function(err){
//     if(!err){
//          console.log('The update was a success!\n');
//       }
//       else{
//          console.log('There was an error!\n', err);
//       }
//    });


// TEST
// DELETE DATA IN A FILE
//  //@TODO: Remove this before building the real server
_data.delete('test', 'newFile', function(err){
    if(!err){
         console.log('File successfully deleted\n');
      }
      else{
         console.log('There was an error!\n', err);
      }
   });


 // Instantiate the HTTP server 
 var httpServer = http.createServer(function(req, res){
 unifiedServer(req, res);

});
 // start the HTTP server
 httpServer.listen(config.httpPort, function(){
    console.log(`HTTP Server is running on port, ${config.httpPort}`);
 });

 // Instantiate the HTTPS server
 httpsServerOptions = {
   'key' : fs.readFileSync('./https/key.pem'),
   'cert' : fs.readFileSync('./https/cert.pem')
   };

var httpsServer = https.createServer(httpsServerOptions, function(req, res){
 unifiedServer(req, res);

});
 // Start the HTTPS server
 httpsServer.listen(config.httpsPort, function(){
    console.log(`HTTPS Server is running on port, ${config.httpsPort}`);
 });

 // All the server logic for both the http and https server
 var unifiedServer = function(req, res){
  
//  Get the URL and parse it 
var parseUrl = url.parse(req.url, true);
// Get the path
var path = parseUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g, ''); // this trims off any extranious slashes

// Get the query string as an object
var queryStringObject = parseUrl.query;

// Get the HTTP method
var method = req.method.toLowerCase();

// Get the Headers as an object
var headers = req.headers;

// Get the payload, if any
var decoder = new StringDecoder('utf-8');
var buffer = '';
req.on('data', function(data){
      buffer += decoder.write(data);
});
req.on('end', function(){
      buffer += decoder.end();
      // Choose the handler this request should go to. If one is not found, use the notFound handler
      var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
      // construct the data object to send to the handler
      var data = {   'trimmedPath' : trimmedPath,
                     'queryStringObject' : queryStringObject,
                     'method' : method,  
                     'headers' : headers,
                     'payload' : buffer,     
                  };
      // Route the request to the handler specified in the router
      chosenHandler(data, function(statusCode, payload){
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // Use the payload called back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};
      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);
      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('Returning this response: ', statusCode, payloadString);
      });
      // send the response    
//  res.end('Hello, World\n');
   });
 }
 
 //Define a request router
 var router = {
   //  'sample' : handlers.sample
   'ping' : handlers.ping,
   'users' : handlers.users,
 };
