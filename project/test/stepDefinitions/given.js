const { Given, When } = require('cucumber');
const fs = require('fs')
var webdriverjs = require('webdriverjs');
const https = require('https');
const open = require('open');
const timeOutinMs = 5000;
const moment = require('moment');
const assert = require('assert');
const screenshotPath = './test/reports/errorShots/';
const fileutils = require('../utils/fileoperations');
const mobileElementAction = require('../helpers/mobileElementActions');
const mobileactions = require('../helpers/mobileactions');
var emailUtils = require('../utils/emailConfiguration');
const utils = require('../utils/genericutilities');
const contentful = require('../services/contentful');
const verifyEmail = require('../services/janrain/verificationCode');
const deviceName = fileutils.readMobileCaps()[0].deviceName
const platform = fileutils.readMobileCaps()[0].platformName.toLowerCase();
const caps = fileutils.readMobileCaps()[0] || {};
const { bundleid, appActivity, appPackage, safaribrowserbundleid, settingsApp ,platformVersion} = caps;

fileutils.logConsoleOutput();
var ifunc = 0
var Horseman = require('node-horseman');
var horseman = new Horseman();
Given(/^I launch the Madelyne application$/, async () => {
  try {
    switch (platform) {
      case 'android':
        try {
          // // perform operation on android
          // driver.setImplicitTimeout(5000)
          const exists1 = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, "login.to.your.account")}`).isVisible(), timeOutinMs, 'Element not found');
          if (exists1) {
            console.log("Login Screen is displayed")
            browser.element(`${fileutils.readPropertyFile(platform, "back")}`).click()
          }
        }
        catch (e) {
          console.log("Already In Tempo Screen")
          // //browser.saveScreenshot();
        }
        ////browser.saveScreenshot();
        break;
      case 'ios':
        try {
          const exists1 = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, "more")}`).isVisible(), timeOutinMs, 'Element not found');
          if (exists1) {
            browser.element(`${fileutils.readPropertyFile(platform, "more")}`).click();
            mobileactions.swipeDown(0.95);
            browser.element(`${fileutils.readPropertyFile(platform, "login.and.security.option")}`).click();
            browser.element(`${fileutils.readPropertyFile(platform, "logout")}`).click();
            browser.launch();
            browser.pause(2000);
            const exists3 = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, "login.to.your.account")}`).isVisible(), timeOutinMs, 'Element not found');
            if (exists3) {
              console.log("Login Screen is displayed")
              browser.element(`${fileutils.readPropertyFile(platform, "back")}`).click()
            }
          }
        }
        catch (ee) {
          try {
            // perform operation on android
            const exists1 = browser.waitUntil(() => browser.element(`${fileutils.readPropertyFile(platform, "login.to.your.account")}`).isVisible(), timeOutinMs, 'Element not found');
            if (exists1) {
              console.log("Login Screen is displayed")
              browser.element(`${fileutils.readPropertyFile(platform, "back")}`).click()
            }
          }
          catch (e) {
            console.log("Already In Tempo Screen")
             //browser.saveScreenshot();
          }
        }
        ////browser.saveScreenshot();
        break;
      case 'web':
        // perform operation on web
        break;
      default: break
    }
  } catch (e) {
    console.error('Cannot Go to Tempo Screen', e);
    //browser.saveScreenshot();
    return assert.strictEqual(platform, '', e);
  }
});
Given(/^I "([^"]*)" alerts$/, async (action) => {
  try {
    switch (platform) {
      case 'android':
        // perform operation on android
        break;
      case 'ios':
        if (action === 'accept') {
          browser.waitUntil(() => browser.alertAccept(), timeOutinMs, 'Error: Element not found');
          console.log('Allow Push Notifications');
        } else {
          browser.waitUntil(() => browser.alertDismiss(), timeOutinMs, 'Error: Element not found');
          console.log('Dismissed Push Notifications');
        }
        ////browser.saveScreenshot();
        break;
      case 'web':
        // perform operation on web
        break;
      default: break
    }
  } catch (e) {
    console.error('Cannot click on alerts');
    //browser.saveScreenshot();
    return assert.strictEqual(platform, '', e);
  }
});