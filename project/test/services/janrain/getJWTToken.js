const https = require('https');
const fs = require('fs');
const path = require('path');

const fileutils = require(path.join(process.cwd(), './test/utils/fileoperations.js')); //eslint-disable-line


module.exports = {

  // form data
  // TO-DO: Make it dynamic or read from file
  jwtTokenapi(accesstoken) {
    let data;
    return new Promise((resolve) => {
      const caps = fileutils.readMobileCaps()[0] || {};
      const { platformVersion, platformName, deviceName } = caps;

      // request option
      const options = {
        host: 'vega-gateway.iv.connectedcarecloud.com',
        method: 'POST',
        path: '/authorize',
        headers: {
          authorization: `OAuth ${accesstoken}`,
          'cc-app-name': 'Vega_IOS',
          'cc-app-version': '1.0.1',
          'cc-app-instance-id': 'vega',
          'cc-app-device': deviceName,
          'cc-app-device-os': platformName,
          'cc-app-device-os-version': platformVersion,
          //   'Content-Type': 'application/x-www-form-urlencoded',
          //   'Content-Length': postData.length
        },
      };

      // request object

      const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        let result = '';
        res.on('data', (chunk) => {
          result += chunk;
        });

        res.on('end', () => {
          // console.log(result+'\n\n');
          data = JSON.parse(result);
          fs.writeFile('./test/testdata/code.txt', data.jwt, (err) => {
            if (err) throw err;
            console.log('File has been overwritten for jwt!');
          });

          return resolve(result);
        });
        res.on('error', (err) => {
          console.log(err);
        });
      });

      // req error
      req.on('error', (err) => {
        console.log(err);
      });

      // send request witht the postData form
      //   req.write("string":"hey");

      req.end();
    });
  },
};
