const https = require('https');
const querystring = require('querystring');

module.exports = {

  // form data
  // TO-DO: Make it dynamic or read from file
  api: function api() {
    const postData = querystring.stringify({
      client_id: 'k4v835fg6e5d3a74xy5j8f5kxxhgvs76',
      flow: 'vega',
      flow_version: '20190226190405737232',
      locale: 'en-US',
      redirect_uri: 'http://localhost',
      response_type: 'token',
      form: 'registrationForm',
      emailAddress: 'boseabm@mailinator.com',
      firstName: 'abpramm',
      lastName: 'bosiem',
      'birthdate[dateselect_month]': '1',
      'birthdate[dateselect_day]': '10',
      'birthdate[dateselect_year]': '1977',
      newPassword: 'testTest',
      newPasswordConfirm: 'testTest',
      displayName: 'abpram',
    });

    // request option
    const options = {
      host: 'lilly-ccare-iv.us-dev.janraincapture.com',
      method: 'POST',
      path: '/oauth/register_native_traditional',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    };

    // request object

    const req = https.request(options, (res) => {
      let result = '';
      res.on('data', (chunk) => {
        result += chunk;
      });

      res.on('end', () => {
        console.log(result);
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
  },
};
