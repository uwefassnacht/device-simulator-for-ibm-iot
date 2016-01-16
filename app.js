//------------------------------------------------------------------------------
// Setup all the required node modules we'll need
//------------------------------------------------------------------------------

//---Use the async module to loop forever---------------------------------------
var async = require("async");

//---The ibmiotf package simplifies intractions with the IoT Foundation Service-
var Iotf = require("ibmiotf");

//---The cfenv module helps to access the Cloud Foundry environment-------------
var cfenv = require('cfenv');

// get the application environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log('---DEBUG appENV:---');
console.log(appEnv);

//------------------------------------------------------------------------------
// Connect to all the required services (assume they have been created)
//------------------------------------------------------------------------------

//---Get Service Configurations and Crendentials--------------------------------

// if app is running on cloud foundry
if (appEnv.isLocal === false) {

    // read configurations out of CF env variables
    var iotfConfig = {
        "org" : appEnv.getServiceCreds('my-iotf-service').org,
        "id" : "my-device-simulator",
        "auth-token" : "mydevicesimulatortoken",
        "type" : "device-simulator",
        "auth-method" : "token"
    };

// if app is running locally
} else {

    // read configurations out of local .env file
    require('dotenv').load();

    var iotfConfig = {
        "org" : process.env.iotf_org,
        "id" : "my-device-simulator",
        "auth-token" : "mydevicesimulatortoken",
        "type" : "device-simulator",
        "auth-method" : "token"
    };
}

//---Connect to the IoT Foundation service--------------------------------------

console.log('---DEBUG iotConfig:---');
console.log(iotfConfig);

// Initialize the iotf library with my config
var iotf = new Iotf.IotfDevice(iotfConfig);

// Connect to the initialized iotf service
iotf.connect();

iotf.on("connect", function () {
    console.log("Device simulator is connected to the IoT Foundation service");

    async.forever(
    function(next) {

        // Publish a random number between 0 and 100
        var currentTemp = Math.floor(Math.random() * 100);
        var currentWindSpeed = Math.floor(Math.random() * 100);
//        var myData = "{"d" : { "temperature" : currentTemp, "windspeed" : currentWindSpeed}}";

// Need to build up a JSON object and then convert it into a string.
        var myData = "bla";
        iotf.publish("status","json", myData);

        //Repeat after 2 seconds
        setTimeout(function() {
            next();
        }, 2000);
    },
    function(err) {}
    );
});
