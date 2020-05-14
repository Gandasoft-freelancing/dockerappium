const { expect } = require("chai");
const RandExp = require("randexp");
const { When, Then } = require("cucumber");
const moment = require("moment");
const timeOutinMs = 15000;
const assert = require("assert");
const appconfig = require("../services/appConfig");
const contentful = require("../services/contentful");
const mobileElementAction = require("../helpers/mobileElementActions");
const fileutils = require("../utils/fileoperations");
const utils = require("../utils/genericutilities");
const mobileactions = require("../helpers/mobileactions");
const platform = fileutils.readMobileCaps()[0].platformName.toLowerCase();
const data = fileutils.readMobileCaps()[0] || {};
const {
  FirstName,
  LastName,
  EmailAddress,
  InvalidEmail,
  ChoosePassword,
  Month,
  Day,
  Year,
  Hour,
  Minute,
  deviceName,
  TimeMeridien,
  RegistrationPassword,
  ConfirmRegistrationPassword,
  NotRegEmailID
} = data;
const regex = {
  FirstNameandLastName: /^[a-zA-Z_ ]+$/,
  EmailAddress: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PasswordVerify: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!,\d%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  SpecialandAlphanumericCharacters: /^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$/
};
let globalvar;
let globalarr = [];
var pastTime = "";
var pastDate = "";
var pastTime24 = "";
var pastHour = "";
var pastMinute = "";
var pastampm = "";
var currentTime = "";
var currentTime24 = "";
When(
  /^I tap "([^"]*)" (?:button|link|header|field|tab|option)$/,
  async object => {
    try {
      switch (platform) {
        case "android":
          const exists1 = browser.waitUntil(
            () =>
              browser
                .element(`${fileutils.readPropertyFile(platform, object)}`)
                .isVisible(),
            timeOutinMs,
            "Element not found"
          );
          if (exists1) {
            browser
              .element(`${fileutils.readPropertyFile(platform, object)}`)
              .click();
            console.log(`Clicked on ${object}`);
            ////browser.saveScreenshot();
          }
          browser.pause(2000);
          break;
        case "ios":
          const exists = browser.waitUntil(
            () =>
              browser
                .element(`${fileutils.readPropertyFile(platform, object)}`)
                .isVisible(),
            timeOutinMs,
            "Element not found"
          );
          if (exists) {
            browser
              .element(`${fileutils.readPropertyFile(platform, object)}`)
              .click();
            console.log(`Clicked on ${object}`);
            ////browser.saveScreenshot();
          }
          break;
        case "web":
          // perform operation on web element
          break;
        default:
          break;
      }
    } catch (e) {
      console.error(` Cannot click on ${object}${e}`);
      //browser.saveScreenshot();
      return assert.strictEqual(platform, "", e);
    }
  }
);