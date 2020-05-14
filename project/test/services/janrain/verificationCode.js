const https = require('https');
const querystring = require('querystring');
const fs = require('fs')

module.exports = {

  api: function api() {
    return new Promise((resolve) => {
      // Reading the data from the file
      const readdata = fs.readFile('./test/testdata/codeforregscreen.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(`Unable to read file:${err}`)
        }
        
        return data.toString();
      })

      console.log('Code read from the file:'+readdata);

      const postData = querystring.stringify({

        // this code needs to be fetched from email for each request
        // Removed 'e487paveru6c44brffwsbuwzq5vuy94j' and added the readfile line

        verification_code: readdata,

      });

      const options = {
        host: 'lilly-ccare-iv.us-dev.janraincapture.com',
        method: 'POST',
        path: '/access/useVerificationCode',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },

      };

      // request object

      const req = https.request(options, (res) => {
        let result = '';
        res.on('data', (chunk) => {
          result += chunk;
        });

        res.on('end', () => resolve(result));
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
