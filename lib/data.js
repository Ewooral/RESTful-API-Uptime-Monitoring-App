// Library for storing and editing data

//Dependencies

var fs = require('fs');
var path = require('path');

// container for the module files
var lib = {};

//Base direcooryof the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//write data to a files
lib.create = function(dir, file, data, callback){
    //Open the file with write permissions
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};



// Export the module
module.exports = lib;