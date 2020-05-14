const https = require('https');
const querystring = require('querystring');
// var readToken = require('./config')
const fs = require('fs');


module.exports = {

  // form data
  // TO-DO: Make it dynamic or read from file
  authTokenapi(token) {
    let data;
    return new Promise((resolve) => {
      console.log(`Auth Token is ===  ${token}`);

      const postData = querystring.stringify({
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: 'http://localhost',

      });


      // request option
      const options = {
        host: 'vega-gateway.iv.connectedcarecloud.com',
        method: 'POST',
        path: '/oauth/token',
        headers: {
          'x-oauth-client-id': 'k4v835fg6e5d3a74xy5j8f5kxxhgvs76',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length,
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
          fs.writeFile('./test/testdata/code.txt', data.access_token, (err) => {
            if (err) throw err;
            console.log('File has been overwritten!');
          });

          return resolve(data.access_token);
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
