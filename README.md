# Device Simulator Overview

What if you're building or testing Internet of Things (IoT) solutions based on the [IBM IoT Foundation][iotf_url] service ... but don't have an actual device to connect to it? Even if you have a device, maybe you'd like it to emit specific types and patterns of data?

This is a heavily commented node.js application, that acts as a "fake device", connects to the IBM IoT Foundation service and emits data. The emitted data can easily be controlled via a few lines of code.


## Registering the simulator in the IoT Foundation service

**Note** that this simulated device **can only connect to your instance of the IoT Foundation service if it has been registered**. This can either be done via the IoT Foundation dashboard or its API.


# Running the application locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

2. Install [Node.js](http://nodejs.org/)
3. Go to the project folder in the terminal and run:
    `npm install`
4. Add a .env file with the name of the IoT Foundation org you would like to connect to:
    ``echo "<iotFoundationOrgNameGoesHere>" > .env``
   Or (alternatively) add the name of the org directly in the code (app.js file)
5. Start the application
6.  `node app.js`


# Next features / help wanted

- [ ] Add web interface
  - [ ] Allow entry of IoT Foundation org via web interface
  - [ ] Display status of app (# of messages, topics, data packets, ...) via web interface

- [ ] Simulate multiple devices in parallel

- [ ] Make app deployable to Bluemix via "Deploy to Bluemix button"


# License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).


# Open Source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[bluemix_url]: https://bluemix.net
[iotf_url]: https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation
[sign_up]: https://console.ng.bluemix.net/registration/
[cloud_foundry]: https://github.com/cloudfoundry/cli
