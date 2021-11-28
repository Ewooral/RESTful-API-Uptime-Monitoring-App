/**
 * Primary file for the RESTful API
 */

// Dependencies
 const http = require('http');
 const url = require('url');
 // The server should respond to al requests with a string
 let server = http.createServer(function(req, res){

//  Get the URL and parse it 
const parseUrl = url.parse(req.url, true);
// Get the path
const path = parseUrl.pathname;
let trimmedPath = path.replace(/^\/+|\/+$/g, ''); // this trims off any extranious slashes
// Get the HTTP method
let method = req.method.toLowerCase();
// send the response 
 res.end('Hello, World\n');
// Log the request path
console.log(`Request received on path ${trimmedPath} with the method: ${method}`);
   
 });


 // start the server, and have it listen on port 5000
 server.listen(5000, function(){
    console.log('Server is running on port 5000');
 });