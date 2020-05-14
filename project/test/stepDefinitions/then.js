const { expect } = require('chai');
const { each } = require('lodash');
const timeOutinMs = 15000;
const assert = require('assert');
const fs = require('fs');
const screenshotPath = './test/reports/errorShots/';
const moment = require('moment');
// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();
const isEnglish = require("is-english");
const { When, Then } = require('cucumber');
const _ = require('underscore')
const appconfig = require('../services/appConfig');
const emailUtilsforregscreen = require('../utils/emailConfigurationforRegScreen');
const emailUtilsforregscreen1 = require('../utils/emailConfigurationforRegScreen');
const emailUtilsforforgotpassword = require('../utils/emailConfigurationforForgotPwd');
const mobileElementAction = require('../helpers/mobileElementActions');
const fileutils = require('../utils/fileoperations');
const utils = require('../utils/genericutilities');
const mobileactions = require('../helpers/mobileactions');
const contentful = require('../services/contentful');
const platform = fileutils.readMobileCaps()[0].platformName.toLowerCase();
const caps = fileutils.readMobileCaps()[0] || {};
const {
  UserFirstName, safaribrowserbundleid, appPackage, appActivity, HCPCode, Hour, Minute, TimeMeridien, bundleid,
  IncorrectHCPCode,
} = caps;
let recordlevel
let painintensitylevel
let i = 0
Then(/^I should see "([^"]*)" (?:screen|button|view|header|subheader|label|menu|icon|dot|section|alert|card|option|title|bullet)$/, async (object) => {
  try {
    switch (platform) {
      case 'android':
        browser.pause(5000);
        const exists1 = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, object)}`).isVisible(), timeOutinMs, 'Element not found');
        if (exists1) {
          let obj1 = object
          console.log(`${object} is displayed`);
          obj1 = obj1.replace(/\./g, '_');
          const filePath = `${screenshotPath + obj1}.png`;
          //browser.saveScreenshot(filePath);
        }
        break;
      case 'ios':
          browser.pause(3000);
        const exists = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, object)}`).isVisible(), timeOutinMs, 'Element not found');
        if (exists) {
          let obj = object
          console.log(`${object} is displayed`);
          obj = obj.replace(/\./g, '_');
          const filePath = `${screenshotPath + obj}.png`;
         ////browser.saveScreenshot(filePath);
        }
        break;
      case 'web':
        // web operation
        break;
      default: break
    }
  } catch (e) {
    console.error(`${object} is not displayed`);
   //browser.saveScreenshot();
    return assert.strictEqual(platform, '', e);
  }
});