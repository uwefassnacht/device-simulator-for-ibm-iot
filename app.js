//------------------------------------------------------------------------------
// Change variable values in this section to customize emitted data
//------------------------------------------------------------------------------

// Name of the MQTT topic that the data should be published on
var topicToBePublishedOn = 'myTopic';

// Wait this many seconds before publishing the next set of data
var varIntervalBetweenData = 1;


//------------------------------------------------------------------------------
// Setup all the required node modules we'll need
//------------------------------------------------------------------------------

// Require the express framework
var express = require('express');

// Initialize the app as an express application
var app = express();

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


//---Start server---------------------------------------------------------------

app.listen(appEnv.port, function(){
    console.log("Server started on " + appEnv.url);
});


//---Get IoT Foundation Configuration and Crendentials--------------------------

// read configurations out of local .env file
require('dotenv').load();

var iotfConfig = {
    "org" : process.env.iotf_org,
    "id" : "my-device-simulator",
    "auth-token" : "mydevicesimulatortoken",
    "type" : "device-simulator",
    "auth-method" : "token"
};


//---Connect to the IoT Foundation service--------------------------------------

console.log('---DEBUG iotConfig:---');
console.log(iotfConfig);

// Initialize the iotf library with my config
var iotf = new Iotf.IotfDevice(iotfConfig);

// Connect to the initialized iotf service
iotf.connect();

iotf.on("connect", function () {
    console.log("Device simulator is connected to the IoT Foundation service");

    // inital data packet to be emitted as a JSON object
    var dataPacket = {
        "d" : {
            "temperature" : 0,
            "pressure" : 50
        }
    };

    // loop forever
    async.forever(
    function(next) {

        // convert the data packet into a string and then publish it
        iotf.publish("status","json", JSON.stringify(dataPacket) );

        //
        // increment temperature up to 100 then back down to 0
        //
        if (dataPacket.d.temperature === 0) {
            countingUp = true;
            temperatureIncrement = 1;
        } else if (dataPacket.d.temperature === 100) {
            countingUp = false;
            temperatureIncrementincrement = -1;
        }
        dataPacket.d.temperature = dataPacket.d.temperature + temperatureIncrement;

        //
        // increment the pressure until 100 and start again at 0
        //
        pressureIncrement = 2;
        if (dataPacket.d.pressure === 100) {
            dataPacket.d.pressure = 0;
        }
        dataPacket.d.pressure = dataPacket.d.pressure + pressureIncrement;


        //Repeat after 2 seconds
        setTimeout(function() {
            next();
        }, varIntervalBetweenData*1000);
    },
    function(err) {}
    );
});
