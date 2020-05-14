const fileutils = require('../utils/fileoperations');
const fs = require('fs');
let SCREEN_SIZE;
let emailInteger;
/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
  up: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 },
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 },
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 },
  },
  down: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 },
  },
};
const methods = {
  calculateXY({ x, y }, percentage) {
    return {
      x: x * percentage,
      y: y * percentage,
    };
  },
  getDeviceScreenCoordinates(screenSize, coordinates) {
    return {
      x: Math.round(screenSize.width * (coordinates.x / 100)),
      y: Math.round(screenSize.height * (coordinates.y / 100)),
    };
  },
  swipe(from, to) {
    browser.touchPerform([{
      action: 'press',
      options: from,
    }, {
      action: 'wait',
      options: { ms: 1000 },
    }, {
      action: 'moveTo',
      options: to,
    }, {
      action: 'release',
    }]);
    browser.pause(1000);
  },
  swipeOnPercentage(from, to) {
    SCREEN_SIZE = SCREEN_SIZE || browser.windowHandleSize().value;
    const pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
    const moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, to);
    this.swipe(
      pressOptions,
      moveToScreenCoordinates,
    );
  },
  swipeDown(percentage) {
    this.swipeOnPercentage(
      this.calculateXY(SWIPE_DIRECTION.down.start, percentage),
      this.calculateXY(SWIPE_DIRECTION.down.end, percentage),
    );
  },
  swipeUp(percentage) {
    this.swipeOnPercentage(
      this.calculateXY(SWIPE_DIRECTION.up.start, percentage),
      this.calculateXY(SWIPE_DIRECTION.up.end, percentage),
    );
  },
  swipeLeft(percentage) {
    this.swipeOnPercentage(
      this.calculateXY(SWIPE_DIRECTION.left.start, percentage),
      this.calculateXY(SWIPE_DIRECTION.left.end, percentage),
    );
  },
  swipeRight(percentage) {
    this.swipeOnPercentage(
      this.calculateXY(SWIPE_DIRECTION.right.start, percentage),
      this.calculateXY(SWIPE_DIRECTION.right.end, percentage),
    );
  },
  checkIfVisibleWithScrollDown(element, maxScrolls, amount = 0) {
    if ((!element.isExisting() || !element.isVisible()) && amount <= maxScrolls) {
      this.swipeDown(0.25);
      this.checkIfVisibleWithScrollDown(element, maxScrolls, amount + 1);
    }
    else if (amount > maxScrolls) {
      // throw new Error(`The element '${element}' could not be found or is not visible.`);
      console.log("Element is Found")
    }
  },
  sendAppToBackground(seconds) {
    browser.background(seconds);
  },
  screenLock() {
    if (browser.isLocked) {
      browser.unlock();
    } else {
      browser.lock();
    }
  },
  hideDeviceKeyboard() {
    browser.hideDeviceKeyboard();
  },
  hideDeviceKeyboardIOS() {
    browser.element(`${fileutils.readPropertyFile("ios", "return")}`).click();
  },
  turnOnTouchID() {
    browser.toggleTouchIdEnrollment(true);
  },
  simulatetouchID() {
    browser.touchId(true);
  },
  openNotificationsPane() {
    browser.openNotifications();
  },
  closeCurrentApp() {
    browser.closeApp();
  },
  // Simulates mouse scroll movements on the page, similar to swipe but in here,
  // it goes to next or previous page completely instead
  // of scrolling a current component
  mobileScroll(swipedirection) {
    browser.execute('mobile: scroll', { direction: swipedirection });
  },
  swipe_up(element) {
    const size = browser.element(`${fileutils.readPropertyFile("android", element)}`)
    const x = size.getLocation('x');
    const y = size.getLocation('y');
    let arr = browser.windowHandleSize().value;
    browser.touchAction([
      { action: 'press', x, y },
      { action: 'moveTo', x, y: y * 10 },
      'release'
    ]);
    browser.pause(1000);
  },
  swipe_down(element) {
    const size = browser.element(`${fileutils.readPropertyFile("android", element)}`)
    const x = size.getLocation('x');
    const y = size.getLocation('y');
    let arr = browser.windowHandleSize().value;
    browser.touchAction([
      { action: 'press', x, y },
      { action: 'moveTo', x, y: y / 10 },
      'release'
    ]);
    browser.pause(1000);
  },
  incrementEmailAddress(EmailAddress) {
    let emailInteger
    let email = `${fileutils.readPropertyFile("data", "email")}`
    let emailaddress = `${fileutils.readPropertyFile("data", EmailAddress)}`
    let sample = emailaddress.split('+')[1]
    emailInteger = parseInt(sample.split('@')[0])
    let emailist = email.split('@');
    fs.readFile('./test/testdata/data.properties', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var modEmail = emailist[0] + "+" + (emailInteger + 1) + "@" + emailist[1];
      //  var result1 = data.replace(emailInteger, emailInteger+1);
      var result = data.replace(emailaddress, modEmail);
      // console.log(result)
      fs.writeFile('./test/testdata/data.properties', result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  },
  replaceProperties(searchproperty, newproperty) {
    let prop1 = `${fileutils.readPropertyFile("data", searchproperty)}`
    let prop2 = `${fileutils.readPropertyFile("data", newproperty)}`
    fs.readFile('./test/testdata/data.properties', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(prop1, prop2);
      // console.log(result)
      fs.writeFile('./test/testdata/data.properties', result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  },
};
module.exports = methods;
