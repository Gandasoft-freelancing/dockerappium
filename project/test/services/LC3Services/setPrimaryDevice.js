const https = require('https');
const path = require('path');

const fileutils = require(path.join(process.cwd(), './test/utils/fileoperations.js')); //eslint-disable-line


module.exports = {

  // form data

  setPrimaryDevice(jwttoken) {
    return new Promise((resolve) => {
      const caps = fileutils.readMobileCaps()[0] || {};
      const { platformVersion, platformName, deviceName } = caps;

      // request option
      const options = {
        host: 'vega-gateway.iv.connectedcarecloud.com',
        method: 'POST',
        path: '/devices/primary',
        headers: {
          authorization: jwttoken,
          'cc-app-name': 'Vega_IOS',
          'cc-app-version': '1.0.1',
          'cc-app-instance-id': 'vega',
          'cc-app-device': deviceName,
          'cc-app-device-os': platformName,
          'cc-app-device-os-version': platformVersion,

        },
      };

      // request object


      const req = https.request(options, (res) => {
        // let result;
        // const { statusCode } = res;

        // res.on('data', (chunk) => {
        //   result += chunk;
        // });

        res.on('end', () => resolve(`Success: ${res.statusCode}`))


        res.on('error', (err) => {
          console.log(err);
        });
      });

      // req error
      req.on('error', (err) => {
        console.log(err);
      });

      req.end();
    });
  },
};
