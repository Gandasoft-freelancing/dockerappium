/* eslint-disable func-names */
const csv = require('csv-parser');
const fs = require('fs');
const PropertiesReader = require('properties-reader');
const results = [];
const { filter } = require('lodash');
const util = require('util');
const caps = require('../testdata/mobilecaps.json');
const methods = {
  readMobileCaps() {
    return filter(caps, (data) => {
      if (data.RunMode) return data;
      return undefined
    });
  },
  readCSV() {
    return new Promise((resolve) => {
      fs.createReadStream('./test/testdata/mobileCapabilitySetUp.csv')
        .pipe(csv())
        .on('data', (data) => {
          try {
            // Store data into results array
            results.push(data);
          } catch (err) {
            // error handler
            throw err;
          }
        })
        .on('end', data => resolve(data));
    });
  },
  getArrayValues() {
    let arr;
    return new Promise((resolve) => {
      this.readCSV().then((value) => {
        arr = value;
        // console.log(arr[0]);
        arr = arr.filter(data => data.Run.toLowerCase() === 'yes');
        return resolve(arr);
      });
    });
  },
  readPropertyFile(env, key) {
    const properties = PropertiesReader(`./test/testdata/${env}.properties`);
    // return function(key) {
    const element = properties.get(key);
    return element;
    // }
  },
  writeToFile(file, str) {
    const path = `./test/testdata/${file}.properties`;
    // file exists
    fs.writeFile(path, str, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  },
  writeToPropertyFile(file, key, str) {
    const properties = PropertiesReader(`./test/testdata/${file}.properties`);
    properties.set(key, str);
  },
  writeToJSONFile(file, key, str) {
    const path = `./test/testdata/${file}.json`;
    const obj = {
      table: [],
    };
    obj.table.push({ id: key, value: str });
    const jsonData = JSON.stringify(obj);
    if (fs.existsSync(path)) {
      fs.writeFile(path, jsonData, (err) => {
        if (err) return console.error(err);
        console.log('Data written to file');
        return undefined
      });
    }
  },
  logConsoleOutput() {
    const logFile = fs.createWriteStream(`${process.cwd()}/test/reports/log.txt`, { flags: 'w' });
    // Or 'w' to truncate the file every time the process starts.
    const logStdout = process.stdout;
    console.log = function (data) {
      logFile.write(`${util.format(data)}\n`);
      logStdout.write(`${util.format(data)}\n`);
    };
    console.error = console.log;
  },
  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(`${process.cwd()}/test/testdata/code.txt`, 'utf8', (error, data) => {
        if (error) return reject(error);
        return resolve(data);
      });
    });
  },
};
module.exports = methods;
