# Device Simulator Overview

What if you're building or testing Internet of Things (IoT) solutions based on the [IBM IoT Foundation][iotf_url] service ... but don't have an actual device to connect to it? Even if you have a device, maybe you'd like it to emit specific types and patterns of data?

This is a heavily commented node.js application, that acts as a "fake device", connects to the IBM IoT Foundation service and emits data. The emitted data can easily be controlled via a few lines of code.

The code can be run locally on your development machine or can easily be pushed to IBM's Cloud Foundry based [Bluemix][bluemix_url] platform.

## Registering the simulator in the IoT Foundation service

**Note** that this simulated device **can only connect to your instance of the IoT Foundation service if it has been registered**. This can either be done via the IoT Foundation dashboard or its API.

# Running the application locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

2. Install [Node.js](http://nodejs.org/)
3. Go to the project folder in the terminal and run:
    `npm install`
4. Start the application
5.  `node app.js`

# Deploying and running the application on Bluemix

Give it a try! Click the button below to fork into IBM DevOps Services and deploy your own copy of this application on Bluemix.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.ibm.com/uwefassnacht/device-simulator-for-ibm-iot)


## Getting Started

1. Create a Bluemix Account

  [Sign up][sign_up] for Bluemix, or use an existing account. Bluemix is free tor try.

2. Download and install the [Cloud-foundry CLI][cloud_foundry] tool

3. Edit the `manifest.yml` file and change the `<application-name>` to something unique.

  The name you use will determinate your application url initially, e.g. `<application-name>.mybluemix.net`.

4. Connect to Bluemix in the command line tool
  ```sh
  $ cf api https://api.ng.bluemix.net
  $ cf login -u <your user ID>
  ```

5. Push it live!

  ```sh
  $ cf push
  ```

See the full [Getting Started][getting_started] documentation for more details, including code snippets and references.

## Troubleshooting

To troubleshoot your Bluemix app the sources of information are the logs, to see them, run:

  ```sh
  $ cf logs <application-name> --recent
  ```


# License

This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).


# Open Source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[bluemix_url]: https://bluemix.net
[iotf_url]: https://console.ng.bluemix.net/catalog/services/internet-of-things-foundation
[sign_up]: https://console.ng.bluemix.net/registration/
[cloud_foundry]: https://github.com/cloudfoundry/cli
