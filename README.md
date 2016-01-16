# device-simulator-for-ibm-iot Overview

What if you're building or testing Internet of Things (IoT) solutions based on the [IBM IoT Foundation][iotf_url] service ... but don't have an actual device to connect to it? Even if you have a device, maybe you'd like it to emit specific types and patterns of data?

This is a heavily commented node.js application, that acts as a "fake device" that connects to the IBM IoT Foundation service and emits data. The emitted data can easily be controlled via a lines of code.

The code can run locally on your development machine or can easily be pushed to IBM's Cloud Foundry based [Bluemix][bluemix_url] platform.

# Registering the simulator in the IoT Foundation service

Note that this simulated device can only connect to your instance of the IoT Foundation service if it has been registered. This can either be done via the IoT Foundation dashboard or its API.

# Deploying the code

The code can either be deployed locally (on your development machine) or on Bluemix.

#### Deploy locally

> Instructions to follow. Point to a separate file to keep the README from getting too long

#### Deploy to Bluemix

Deploying the app to Bluemix is automated via the button below. You'll be asked to either log in or sign up for Bluemix (free trial available).

> Note that the button will only work once the repo has been moved from Github Enterprise to the public github

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/uwefassnacht/device-simulator-for-ibm-iot)

#### Next steps

> Instructions to follow. Point to a separate file to keep the README from getting too long

## License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).


## Open Source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[bluemix_url]: https://bluemix.net
[iotf_url]: https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation
