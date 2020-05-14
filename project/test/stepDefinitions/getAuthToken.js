const { Given, Then } = require('cucumber');
const { expect } = require('chai');
const fileutils = require('../utils/fileoperations');
const mobileElementAction = require('../helpers/mobileElementActions');

const timeOutinMs = 10000;

const platform = fileutils.readMobileCaps()[0].platformName.toLowerCase();
const environment = fileutils.readMobileCaps()[0].Environment.toLowerCase();

Given(/^I select the environment$/, async () => {
  try {
    switch (platform) {
      case 'android':
        browser.pause(5000);
        const object = '';
        expect(browser.element(`~${fileutils.readPropertyFile(platform, object)}`).isExisting);
        console.log(`${object} screen is displayed`);
        browser.saveScreenshot();
        break;

      case 'ios':
        // browser.pause(5000);

        const exists = browser.waitUntil(() => browser.element('*//XCUIElementTypePickerWheel').isVisible(), timeOutinMs, 'Error: Element not found');

        if (exists) {
          const picker = '*//XCUIElementTypePickerWheel';
          // let env = fileutils.readMobileCapabilities('Environment').toLowerCase();
          mobileElementAction.selectValueFromPicker(picker, environment);
          browser.element('~Done').click();
          console.log(' Setting the environment');
          browser.saveScreenshot();
        }

        break;

      default: break;
    }
  } catch (e) {
    console.error(' Cannot select environment');
    browser.saveScreenshot();
  }
});


Then(/^I should see Access Token screen$/, async () => {
  try {
    let token;
    switch (platform) {
      case 'android':
        const check = browser.waitUntil(() => browser.element(`~${fileutils.readPropertyFile(platform, 'Access.Token')}`).isVisible(), timeOutinMs, 'Element not found');
        if (check) {
          token = mobileElementAction.getElementText(browser.element(`~${fileutils.readPropertyFile(platform, 'Access.Token')}`));

          fileutils.writeToJSONFile('data', 'Bearer', token);
          console.log(`Access Token screen is displayed${token}`);
        }

        break;


      case 'ios':

        const exists = browser.waitUntil(() => browser.element(`~${fileutils.readPropertyFile(platform, 'Access.Token')}`).isVisible(), timeOutinMs, 'Element not found');

        if (exists) {
          token = mobileElementAction.getElementText(browser.element(`~${fileutils.readPropertyFile(platform, 'Access.Token')}`));

          fileutils.writeToJSONFile('data', 'Bearer', token);
          console.log(`Access Token screen is displayed${token}`);
        }

        break;

      default: break
    }
  } catch (e) {
    console.error('Access Token screen is not displayed');
    browser.saveScreenshot();
  }
});
