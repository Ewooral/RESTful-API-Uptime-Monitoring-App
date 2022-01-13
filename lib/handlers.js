// These are Request handlers
 
// Dependencies


// Define the handlers
var handlers = {};

//ping handler
handlers.ping = function(data, callback){
   callback(200);
};

// // Sample handler
// handlers.sample = function(data, callback){
// // Callback an http status code, and a payload object
// callback(406, {'name': 'sample handler'});
// };

// Not found handler
handlers.notFound = function(data, callback){
callback(404);
};

// Export the module
module.exports = handlers;