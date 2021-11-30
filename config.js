//  Create and export configuration variables

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort' : 5000,
    'httpsPort': 5001,
    'envName' : 'staging'
};

// Production environment
environments.production = {
    'httpPort' : 8000,
    'httpsPort': 8001,
    'envName' : 'production'
    // Set the port to 80
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging 
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;   // Set the environment 

// Export the module
module.exports = environmentToExport;