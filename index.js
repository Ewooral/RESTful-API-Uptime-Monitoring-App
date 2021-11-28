/**
 * Primary file for the RESTful API
 */

// Dependencies
 const http = require('http');
 const url = require('url');
 var StringDecoder = require('string_decoder').StringDecoder;
 // The server should respond to al requests with a string
 var server = http.createServer(function(req, res){


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

      // Choose the handler this request should go to
      // send the response 
 res.end('Hello, World\n');

// Log the request path
console.log(`Request received on path ${trimmedPath} with the method: ${method}
and with these query string parameters: ${JSON.stringify(queryStringObject)} `);

console.log("Request received with these headers: " + JSON.stringify(headers));
console.log("Request received with this payload: " + buffer);
 

   });

});


 // start the server, and have it listen on port 5000
 server.listen(5000, function(){
    console.log('Server is running on port 5000');
 });