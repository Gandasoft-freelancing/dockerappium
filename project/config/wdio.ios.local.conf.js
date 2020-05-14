const path = require('path');
const config = require('./wdio.conf').config;
const fileutils = require('../test/utils/fileoperations');


// ============
// Capabilities
// ============
const caps = fileutils.readMobileCaps()[0] || {};
const {
  deviceName, appiumVersion, platformVersion, platformName, automationName, app, bundleid, udid,wdaLocalPort,
   fullReset,settingsApp,
} = caps

config.capabilities = [
  {
    // The defaults you need to have in your config

    // browserName:"safari",
    appiumVersion :appiumVersion,
    deviceName :deviceName,
    platformVersion :platformVersion,
    platformName :"iOS",
    udid:udid,
    // wdaLocalPort:wdaLocalPort,
    // autoGrantPermissions :true,
    // newCommandTimeout: 180,
    newCommandTimeout: 1000,
   bundleId: bundleid,
     app: path.join(process.cwd(), app), 
    //  webkitDebugProxyPort: "9596",
   // useNewWDA: true,
  //  startIWDP:true,
  //  udid: "auto",
  // autoWebview:true,
  // webkitResponseTimeout: 10000,
    noReset:true,
    // bundleId:settingsApp,
    automationName:"XCUITest",
    // allowTouchIdEnroll: true


    metadata: {
      browser: {
        name: 'safari',
        version: ' 12.1.1',
      },
      device: deviceName,
      platform: {
        name: platformName,
        version: platformVersion,
      },
    },
  },

];


config.services = ['appium','selenium-standalone'];
config.appium = {
  args: {
    address: '0.0.0.0',
    commandTimeout: '7200',
    sessionOverride: true,
    debugLogSpacing: true,

  },
};

config.port = 4727;

exports.config = config;