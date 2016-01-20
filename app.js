//------------------------------------------------------------------------------
// Change variable values in this section to customize emitted data
//------------------------------------------------------------------------------

// Name of the MQTT topic that the data should be published on
var topicToBePublishedOn = 'myTopic';

// Wait this many seconds before publishing the next set of data
var varIntervalBetweenData = 2;

// Quality of Serive for the publish event. Supported values : 0, 1, 2
var QosLevel = 0;

// read the id of the IoT foundation org out of a local .env file
// format of .env file:
// iotf_org=<id of IoT Foundation organization>
require('dotenv').load();

// Note that the following configuration must match with the parameters that
// the device-simulator was registered with. This device registration can
// either be done in the dashboard of the IoT Foundation service or via its
// API

var iotfConfig = {
    "org" : process.env.iotf_org,
    "id" : "my-device-simulator",
    "auth-token" : "mydevicesimulatortoken",
    "type" : "device-simulator",
    "auth-method" : "token"
};


//------------------------------------------------------------------------------
// Setup all the required node modules we'll need
//------------------------------------------------------------------------------

// Require the express framework
var express = require('express');

// Initialize the app as an express application
var app = express();

//---The ibmiotf package simplifies intractions with the IoT Foundation Service-
var Iotf = require("ibmiotf");

//---The cfenv module helps to access the Cloud Foundry environment-------------
var cfenv = require('cfenv');

// get the application environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log('');
console.log('--- DEBUG appENV: ---');
console.log(appEnv);
console.log('');


//---Start the express server---------------------------------------------------

 app.listen(appEnv.port, function() {
     console.log("Server started on " + appEnv.url);
  }).on('error', function(err) {
    if (err.errno === 'EADDRINUSE') {
        console.log('Server not started, port ' + appEnv.url + ' is busy');
    } else {
        console.log(err);
    }
});


//---Connect to the IoT Foundation service--------------------------------------

console.log('');
console.log('--- DEBUG iotConfig: ---');
console.log(iotfConfig);
console.log('');

// Create a client (used to send data)
var iotfClient = new Iotf.IotfDevice(iotfConfig);

// Connect to the initialized iotf service
iotfClient.connect();

// Handle errors coming from the iotf service
iotfClient.on("error", function (err) {
    // console.log("Error received while connecting to IoTF service: " + err.message);
    if (err.message.indexOf('authorized') > -1) {
        console.log('');
        console.log("Make sure the device-simulator is registered in the IotF org with the following configuration:")
        console.log(iotfConfig);
        console.log('');
    }
    process.exit( );
});

iotfClient.on("connect", function () {
    console.log("Device simulator is connected to the IoT Foundation service");
    console.log("QoS level set to: " + QosLevel);

    // inital data packet to be emitted as a JSON object
    var dataPacket = {
        "d" : {
            "temperature" : 0,
            "pressure" : 50
        }
    };


    //--loop forever------------------------------------------------------------

    setInterval(function(){

        // add a time stamp to the data packet
        var date = new Date();
        dataPacket.ts = date.toISOString();

        // convert the data packet into a string and then publish it
        iotfClient.publish("status","json", JSON.stringify(dataPacket) );

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

    }, varIntervalBetweenData*1000);

});
