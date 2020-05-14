const methods = {
  verifyElementEnabled(element) {
    return browser.isEnabled(element);
  },
  clearTextBox(locator) {
    browser.clearElement(locator);
  },
  getElementText(locator) {
    const visualText = locator.getText();
    if (typeof visualText === 'string') {
      return visualText;
    }
    return undefined;
  },
  selectElementbyValue(locator, value) {
    browser.element(locator).selectByValue(value);
  },
  selectElementbyText(locator, text) {
    browser.element(locator).selectByVisibleText(text);
  },
  dragSeekbar(element, xCoordinate) {
    // var element = browser.element(locator);
    element.touchAction([
      'press',
      { action: 'moveTo', x: xCoordinate, y: 0 },
      'release',
    ]);
  },
  scrollList(locator) {
    const element = browser.element(locator);
    element.touchAction([
      'press',
      { action: 'moveTo', x: 0, y: 100 },
      'release',
    ]);
  },
  selectValueFromPicker(picker, value) {
    const ele = $(picker);
    ele.addValue(value);
  },
  selectValueFromPicker1(picker) {
    // const elem = $(picker);
    // // scroll to specific element
    // elem.scrollIntoView(value);
    browser.execute('mobile: scroll', { direction: 'down', element: picker });
  },
  scrollOnListView(list) {
    browser.scroll(list, 0, 200);
  },
  getElementSize(element) {
    const width = browser.getElementSize(element, 'width');
    const height = browser.getElementSize(element, 'height');
    return { width, height };
  },
  tapByCoord(x, y, x1, y1) {
    browser.touchAction([
      { action: 'press', x: x, y: y },
      { action: 'moveTo', x: x1, y: y1 },
      'release'
    ]);
  },
  tapOutsideElement() {
    browser.touchAction({
      action: 'tap', x: 200, y: 50,
    });
  },
  tapByCoordinates(xCoordinate, yCoordinate) {
    browser.touchAction({
      action: 'tap', x: xCoordinate, y: yCoordinate,
    });
  },
};
module.exports = methods;
