const defaultTimeoutInterval = process.env.DEBUG ? 15 * 60 * 1000 : 9000000;
const fileutils = require("../test/utils/fileoperations");
const platform = fileutils.readMobileCaps()[0].platformName.toLowerCase();
const fs = require("fs");
// const { removeSync } = require('fs-extra');
const mobileactions = require("../test/helpers/mobileactions");
const {Eyes, Target} = require('@applitools/eyes.webdriverio');
const eyes = new Eyes();
eyes.setApiKey('Uqyx5yZ3TZMuG110Fv899rA78OJyF50K42fFFp1T9AzlvA110');

exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  //

  specs: [
    // ==================
    // iOS Features
    // ==================
    // './test/features/iOS/test1.feature',
  
    // ==================
    // Android Features
    // ==================

    // './test/features/Android/test-2.feature'

  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 1,

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: "result",
  logOutput: "./test/reports/cucumber-json/",
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // Warns when a deprecated command is used
  deprecationWarnings: true,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: "./test/reports/errorShots/",
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  // baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 100000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  //   connectionRetryTimeout: 90000,
  //
  connectionRetryTimeout: 900000,
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  //
  specFileRetries: 1,
  //
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: "cucumber",
  cucumberOpts: {
    require: [
      "./test/stepDefinitions/given.js",
      "./test/stepDefinitions/when.js",
      "./test/stepDefinitions/then.js"
    ], // <string[]> (file/dir) require files before executing features
    backtrace: true, // <boolean> show full backtrace for errors
    compiler: ["js:babel-core/register"], // <string[]> filetype:compiler used for processing required features
    failAmbiguousDefinitions: true, // <boolean< Treat ambiguous definitions as errors
    dryRun: false, // <boolean> invoke formatters without executing steps
    failFast: false, // <boolean> abort the run on first failure
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat
    // undefined definitions as warnings
    name: [], // <string[]> ("extension:module") require files with the given EXTENSION
    snippets: true, // <boolean> hide step definition snippets for pending steps
    format: ["pretty"], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true, // <boolean> disable colors in formatter output
    source: false, // <boolean> hide source uris
    profile: [], // <string[]> (name) specify the profile to use
    strict: true, // <boolean> fail if there are any undefined or pending steps

 

     ///// Data-Sharing-HCP /////
    ///// Smoke Test :
    // tagExpression: "@SmokeTest",
    ///// Regression Test :
    // tagExpression:  "@RegressionTest",
    ///// Complete Feature :
    // tagExpression: "@datasharing-donotconcent or @datasharing-skiponboarding or @datasharing-agreeandcontinue-multiplepartners",
    ///// Precondition :
    // tagExpression:  "@Precondition" ,

    timeout: defaultTimeoutInterval, // <number> timeout for step definitions
    tagsInTitle: false, // <boolean> add cucumber tags to feature or scenario name
    snippetSyntax: undefined // <string> specify a custom snippet syntax
    // tags: [`@onBoarding"&~@regressionTest`] ,
    // keepAlive: false
  },
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/reporters/dot.html
  reporters: ["spec", "allure", "json", "multiple-cucumber-html"],
  reporterOptions: {
    junit: { outputDir: "./test/reports/junit-results/" },
    json: { outputDir: "./test/reports/json-results/" },
    allure: {
      outputDir: "./test/reports/allure-results/",
      disableWebdriverStepsReporting: false,
      useCucumberStepReporter: true,
      disableWebdriverScreenshotsReporting: false
    },
    htmlReporter: {
      jsonFolder: "./test/reports/cucumber-json/",
      reportFolder: "./test/reports/htmlreports/",
      openReportInBrowser: true,
      disableLog: false,
      displayDuration: true,
      saveCollectedJSON: false,
      pageTitle: "Cucumber HTML Report",
      customData: {
        title: "Run info",
        data: [
          { label: "Project", value: "Madelyne MMA" },
          { label: "Release", value: "1" },
          { label: "Execution Date", value: new Date(Date.now()) }
          // {label: 'Execution End Time', value: new Date(Date.now())}
        ]
      }
      // ... other options, see Options
    }
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test
  //   process in order to enhance
  // it and to build services around it. You can either apply a
  //   single function or an array of
  // methods to it. If one of them returns with a promise,
  //   WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare() {
    switch (platform) {
      case "android":
        console.log("Starting App tests On Android Device");
        break;
      case "ios":
        console.log("Starting App tests On iOS Device");
        break;
    }
    // removeSync('./test/reports/htmlreports/features');
  },
  /**
   * Gets executed just before initialising the webdriver session and test framework.
   * It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before() {
    /**
     * Setup the Chai assertion framework
     */
    // eslint-disable-next-line global-require
    const chai = require("chai");
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  // beforeTest: function (test) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function () {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function () {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest(test) {
    // if test passed, ignore, else take and save screenshot.
    if (test.passed) {
      return;
    }
    console.log("Here : " + test.name);
    // get current test title and clean it, to use it as file name
    const filename = encodeURIComponent(test.title.replace(/\s+/g, "-"));
    // build file path
    const filePath = `${this.screenshotPath + filename}.png`;
    // save screenshot
    browser.saveScreenshot(filePath);
    console.log("\n\tScreenshot location:", filePath, "\n");
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onComplete: function(exitCode, config, capabilities) {
  //     console.log('All done!');
  // }
  // Cucumber specific hooks
  beforeFeature: function(feature) {
    console.log(feature.name + " is started");
    switch (feature.name) {
      case "ACCOUNT SETUP - SOFTWARE TEST PROTOCOL":
        mobileactions.incrementEmailAddress("emailaddress");
        browser.pause(1000);
        mobileactions.incrementEmailAddress(
          "emailaddress.valid.11.precondition"
        );
        browser.pause(1000);
        break;
  },
  beforeScenario: function(scenario) {
    console.log(scenario.name + " is started");
    // browser.launch()
    browser.pause(1000);
  },
  // beforeStep: function (step) {
  // },
  /**
   * Function to be executed after step (in Cucumber) starts.
   * @param {Object} stepResult test details
   */
  // afterStep: function (stepResult) {
  //    // console.log(stepResult.status)
  //    if(stepResult.status=='failed'){
  //       browser.launch()
  //       if(!(browser.element(`${fileutils.readPropertyFile(platform, "more")}`).isVisible())){
  //          browser.element(`${fileutils.readPropertyFile(platform, "more")}`).click();
  //          browser.element(`${fileutils.readPropertyFile(platform, "login.and.security.option")}`).click();
  //          browser.element(`${fileutils.readPropertyFile(platform, "logout")}`).click();
  //          browser.pause(1000)
  //       }
  //       else{
  //          console.log("Already Logged Out");
  //       }
  //    }
  // },
  afterScenario: function(scenario) {
    console.log(scenario.name + " is ended");
    // browser.closeApp();
  },
  afterFeature: function(feature) {
    console.log(feature.name + " is ended");
  }
};
