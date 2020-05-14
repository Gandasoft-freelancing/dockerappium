const https = require('https');
const fs = require('fs');
const path = require('path');

const fileutils = require(path.join(process.cwd(), './test/utils/fileoperations.js')); //eslint-disable-line


module.exports = {

  // form data

  getconfigservices(jwttoken) {
    return new Promise((resolve) => {
      const caps = fileutils.readMobileCaps()[0] || {};
      const { platformVersion, platformName, deviceName } = caps;

      // request option
      const options = {
        host: 'vega-gateway.iv.connectedcarecloud.com',
        method: 'GET',
        path: '/configuration/1/us/en-us',
        headers: {
          authorization: jwttoken,
          'cc-app-name': 'Vega_IOS',
          'cc-app-version': '1.0.1',
          'cc-app-instance-id': 'vega',
          'cc-app-device': deviceName,
          'cc-app-device-os': platformName,
          'cc-app-device-os-version': platformVersion,
          'Content-Type': 'application/json',

        },
      };

      // request object


      const req = https.request(options, (res) => {
        let result = '';

        res.on('data', (chunk) => {
          result += chunk;
        });

        res.on('end', () => {
          const output = JSON.stringify(result, null, 2)

          fs.writeFile('./test/testdata/configuration.json', output, (err) => {
            if (err) throw err;
            console.log('File has been overwritten with config data!');
          });
          return resolve(output);
        });
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
