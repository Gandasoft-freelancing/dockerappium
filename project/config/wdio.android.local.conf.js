const path = require('path');
const config = require('./wdio.conf').config;
const fileutils = require('../test/utils/fileoperations');
// ============
// Capabilities
// ============
const caps = fileutils.readMobileCaps()[0] || {};
const {
  browserName, deviceName, appiumVersion, platformVersion, platformName, automationName,
  app, appPackage, noReset,udid
} = caps
config.capabilities = [
  {
    // The defaults you need to have in your config
    browserName,
    appiumVersion: appiumVersion,
    deviceName: deviceName,
    platformVersion: platformVersion,
    platformName: platformName,
    automationName: automationName,
    autoGrantPermissions: true,
    autoAcceptAlerts:true,
    udid:udid,
    unexpectedAlertBehaviour:true,
    locationServicesAuthorized:true,
    // newCommandTimeout: 180,
    newCommandTimeout: 2000,
    app: path.join(process.cwd(), app),
    useNewWDA: true,
    noReset: true,
    clearSystemFiles: true,
    
    
    // automationName: "uiautomator2",
    metadata: {
      browser: {
        name: 'chrome',
        version: '58',
      },
      device: deviceName,
      platform: {
        name: platformName,
        version: platformVersion,
      },
    },
  },
];
config.services = ['selenium-standalone', 'appium'];
config.appium = {
  args: {
    address: '0.0.0.0',
    commandTimeout: '7200',
    sessionOverride: true,
    debugLogSpacing: true,
    platformName: 'android', 
  },
};
config.port = 4736;
exports.config = config;
