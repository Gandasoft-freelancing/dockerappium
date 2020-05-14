const https = require('https');
const fs = require('fs');
const path = require('path');

const fileutils = require(path.join(process.cwd(), './test/utils/fileoperations.js')); //eslint-disable-line


module.exports = {

  // form data

  getAppSettings(jwttoken) {
    return new Promise((resolve) => {
      const caps = fileutils.readMobileCaps()[0] || {};
      const { platformVersion, platformName, deviceName } = caps;

      // request option
      const options = {
        host: 'vega-gateway.iv.connectedcarecloud.com',
        method: 'GET',
        path: '/app-settings',
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
          const data = JSON.parse(result);
          const jsonContent = `\nisEmailVerified='${data.settings.isEmailVerified}'\nisHCPCodeVerified='${data.settings.isHCPCodeVerified}'
          isOnboardingCompleted='${data.settings.isOnboardingCompleted}'`;
          console.log(`${jsonContent}\n\n`);

          fs.appendFile('./test/testdata/servicesData.txt', jsonContent, (err) => {
            if (err) throw err;
            console.log('File has been overwritten with app settings!');
          });
          return resolve(jsonContent);
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
