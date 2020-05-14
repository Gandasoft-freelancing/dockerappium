const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const fileutils = require(path.join(process.cwd(), './test/utils/fileoperations.js')); //eslint-disable-line


const caps = fileutils.readMobileCaps()[0] || {};
const {
  Email, Password,
} = caps;


const postData = querystring.stringify({
  client_id: 'k4v835fg6e5d3a74xy5j8f5kxxhgvs76',
  flow: 'vega',
  flow_version: '20190226190405737232',
  locale: 'en-US',
  redirect_uri: 'http://localhost',
  response_type: 'code',
  form: 'signInForm',
  signInEmailAddress: Email,
  currentPassword: Password,

});

// request option
const options = {
  host: 'lilly-ccare-iv.us-dev.janraincapture.com',
  method: 'POST',
  path: '/oauth/auth_native_traditional',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length,
  },
};

module.exports = {

  // form data
  // TO-DO: Make it dynamic or read from file


  api() {
    let data;
    return new Promise((resolve) => {
      // request object

      const req = https.request(options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        let result = '';
        res.on('data', (chunk) => {
          result += chunk;
        });

        res.on('end', () => {
          data = JSON.parse(result);
          fs.writeFile('./test/testdata/code.txt', data.authorization_code, (err) => {
            if (err) throw err;
            console.log('File has been created & saved successfully!');
          });
          return resolve(data.authorization_code);
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
      req.write(postData);
      req.end();
    });
  },
};
