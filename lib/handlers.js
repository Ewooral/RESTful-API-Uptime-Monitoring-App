// These are Request handlers
 
// Dependencies
var _data = require('./data');
var helpers = require('./helpers')

// Define the handlers
var handlers = {};

// users 
handlers.users = function(data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405)
    }
}

// container for the user's submethods
handlers._users = {};

// users - POST
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback){
    // Check that all required fields are filled out
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phoneNumber = typeof(data.payload.phoneNumber) == 'string' && data.payload.phoneNumber.trim().length > 10 ? data.payload.phoneNumber.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 10 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    
    if(firstName && lastName && phoneNumber  && password && tosAgreement)
    {
        // make sure that the user doesn't already exit.
        _data.read('users', phoneNumber, function(err, data){
            if(err){
                // hash the password 
                var hashedPassword = helpers.hash(password);
            }else{
                // user already exists.
                callback(400, {Error:"User with that phone number already exists"})
            }
        })
    }
    else
    {
        callback(400, {Error: "Missing required fields"});
    }
}

//users - get
handlers._users.get = function(data, callback){
    // Check that all required fields are filled out
}

//users - put
handlers._users.put = function(data, callback){
    // Check that all required fields are filled out
}

// users - delete
handlers._users.delete = function(data, callback){
    // Check that all required fields are filled out
}





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