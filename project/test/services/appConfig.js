const _ = require('lodash');
const path = require('path');

// const configdata = require(path.join(process.cwd(), './apps/Vega.app/configuration.json'))
const configdata = require(path.join(process.cwd(), './test/testdata/configuration.json')); //eslint-disable-line

const methods = {
  verifyTextFromConfig(screen) {
    switch (screen) {
      case 'EmailVerificationTitle':
        return configdata.iOS.module.emailVerification.text.lblTitle;

      default: break;
    }
    return undefined
  },

  verifyErrorMessageFromConfig(errorType, title) {
    switch (errorType) {
      case 'NoInternetConnection':
        return '<Add config error details here>'
        
      case 'IncorrectCredentials':
        return '<Add config error details here>'

      case 'EmailNotRegistered':
        return '<Add config error details here>'


      default: break;
    }
    return undefined;
  },
};


module.exports = methods;
