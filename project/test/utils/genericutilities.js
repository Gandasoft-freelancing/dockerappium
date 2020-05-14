const _ = require('lodash');
const moment = require('moment');

const methods = {
  timestamp() {
    console.log(`Current Time in Unix Timestamp: ${Math.floor(Date.now() / 1000)}`);
  },
  currentDate() {
    // console.log(`Current Date is: ${new Date().toISOString().slice(0, 10)}`);
    return new Date().toISOString().slice(0, 10);
  },
  verifyStringMatches(testString, substring) {
    return _.includes(testString, substring);
  },
  getcurrentMonth() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[new Date().getMonth()];
  },
  getCurrentYear() {
    return new Date().getFullYear();
  },
  getPrevMonth() {
    return moment().subtract(1, 'month').format('MMMM');
  },
  getPrevYear() {
    return new Date().getFullYear();
  },
  getcurrenttime() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    let strTime;
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    if (hours<=9){
      strTime = `0${hours}:${minutes} ${ampm}`;
    }
    else{
    strTime = `${hours}:${minutes} ${ampm}`;
    }
    return strTime;
  },
  getcurrenttime1() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    let strTime;
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },
  getcurrenttime24() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours %= 12;
    // hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes}`;
    return strTime;
  },
  
  isarraysorted(times, unsortedtimes) {
    times.sort((a, b) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`));
    const isequal = times.length === unsortedtimes.length
    && times.every((element, index) => element === unsortedtimes[index]);
    return isequal
  },

  comparearrays(arr1, arr2) {
    const objMap = {};

    arr1.forEach(e1 => arr2.forEach((e2) => {
      if (e1 === e2) {
        objMap[e1] = objMap[e1] + 1 || 1;
      }
    }));
    return (Object.keys(objMap).map(e => Number(e)));
  },
  getcurrentampmtime() {
    const today = new Date()
    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },

  getdevicecurrenttime() {
    let time = browser.getDeviceTime();
    var values = Object.keys(time).map(function(key){
      return time[key];
    });
    let hours = parseInt(values[0].toString().slice(11,13));
    let minutes = parseInt(values[0].toString().slice(14,16));
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },

getdevicecurrenttime24() {
    let time = browser.getDeviceTime();
    var values = Object.keys(time).map(function(key){
      return time[key];
    });
    let hours = parseInt(values[0].toString().slice(11,13));
    let minutes = parseInt(values[0].toString().slice(14,16));
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes}`;
    return strTime;
  },


  getdevicecurrenttime1() {
    let time = browser.getDeviceTime();
    var values = Object.keys(time).map(function(key){
      return time[key];
    });
    let hours = parseInt(values[0].toString().slice(11,13));
    let minutes = parseInt(values[0].toString().slice(14,16));
    const ampm = hours >= 12 ? 'pm' : 'am';
    let strTime;
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  },
  

};

module.exports = methods;
