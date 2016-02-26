# Device Simulator Overview

What if you're building or testing Internet of Things (IoT) solutions based on the [IBM IoT Platform][iotf_url] service ... but don't have an actual device to connect to it? Even if you have a device, maybe you want it to emit specific types and patterns of data?

This is a heavily commented node.js application, that acts as a "fake device", connects to the IBM IoT Platform service and emits data. The type and pattern of data can easily be controlled via a few lines of code.

For a full specification of the payload, see the IBM IoT Platform docs, specifically the [MQTT Connectivity for Devices section][iotf_messaging_doc].


### Registering the simulator in the IBM IoT Platform service

**Note** that this simulated device **can only connect to your instance of the IBM IoT Platform service if it has been registered**. This can either be done via the [IoT Platform dashboard][iotf_dashboard_doc] or [its API][iotf_api].

Make sure to use the following information when registering this app as device:

    Device ID : "my-device-simulator"
    Device Token: "mydevicesimulatortoken"
    Device Type : "device-simulator"
    Device Authentication method : "token"

## Running the application locally

The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/). Start at step 2 if you have them installed already.

1. Install [Node.js](http://nodejs.org/) (this will also install npm)

2. Go to the project folder in the terminal and install the required npm modules:  
    `npm install`

3. Generate an .env file containing the information that you used to register the device simulator in your IoT Platform organization:
    ```
    iotf_org=<myOrg>
    iotf_type=<myDeviceType>
    iotf_id=<myId>‚
    iotf_authtoken=<myAuthToken>
    ```

4. Start the application:  
    `node app.js`


## Next features / help wanted

- [ ] Add a web interface
  - [ ] Allow the entry of the IoT platform org via web interface
  - [ ] Allow customization via web interface (format and content of data packets, MQTT topics, ...)
  - [ ] Display status of app (# of messages, topics, data packets, ...) via web interface

- [ ] Simulate multiple devices in parallel (useful for load testing)

- [ ] Make app deployable to Bluemix via "Deploy to Bluemix button"


## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).


## Open Source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[bluemix_url]: https://bluemix.net
[iotf_url]: https://console.ng.bluemix.net/catalog/services/internet-of-things-platform/
[sign_up]: https://console.ng.bluemix.net/registration/
[cloud_foundry]: https://github.com/cloudfoundry/cli
[iotf_api]: https://developer.ibm.com/iotfoundation/recipes/api-documentation/
[iotf_dashboard_doc]: https://www.ng.bluemix.net/docs/services/IoT/index.html#iot170
[iotf_messaging_doc]: https://docs.internetofthings.ibmcloud.com/devices/mqtt.html
