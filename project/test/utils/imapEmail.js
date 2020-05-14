/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
console.log("IN email config file")
const Imap = require('imap');
const { inspect } = require('util');
// const open = require('opn');
// const fse = require('fs-extra');
const fs = require('fs');
const fileutils = require('../utils/fileoperations');
const data = fileutils.readMobileCaps()[0] || {};
const { ExternalEmailAddress, ExternalPassword } = data;
const regex = '(^|[ \t\r\n])((ftp|http|https):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))'
console.log("IN email config file")
// var Imap = require("imap");
// var MailParser = require("mailparser").MailParser;
// var Promise = require("bluebird");
// Promise.longStackTraces();
// var imapConfig = {
//     user: ExternalEmailAddress,
//     password: ExternalPassword,
//     host: 'HOST',
//     port: 993,
//     tls: true
// };
// var imap = new Imap(imapConfig);
// Promise.promisifyAll(imap);
// imap.once("ready", execute);
// imap.once("error", function(err) {
//     log.error("Connection error: " + err.stack);
// });
// imap.connect();
// function readforregscreen() {
//     imap.openBox("INBOX", false, function(err, mailBox) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         imap.search(["UNSEEN"], function(err, results) {
//             if(!results || !results.length){console.log("No unread mails");imap.end();return;}
//             /* mark as seen
//             imap.setFlags(results, ['\\Seen'], function(err) {
//                 if (!err) {
//                     console.log("marked as read");
//                 } else {
//                     console.log(JSON.stringify(err, null, 2));
//                 }
//             });*/
//             var f = imap.fetch(results, { bodies: "" });
//             f.on("message", processMessage);
//             f.once("error", function(err) {
//                 return Promise.reject(err);
//             });
//             f.once("end", function() {
//                 console.log("Done fetching all unseen messages.");
//                 imap.end();
//             });
//         });
//     });
// }
// function processMessage(msg, seqno) {
//     console.log("Processing msg #" + seqno);
//     // console.log(msg);
//     var parser = new MailParser();
//     parser.on("headers", function(headers) {
//         console.log("Header: " + JSON.stringify(headers));
//     });
//     parser.on('data', data => {
//         if (data.type === 'text') {
//             console.log(seqno);
//             console.log(data.text);  /* data.html*/
//         }
//         // if (data.type === 'attachment') {
//         //     console.log(data.filename);
//         //     data.content.pipe(process.stdout);
//         //     // data.content.on('end', () => data.release());
//         // }
//      });
//     msg.on("body", function(stream) {
//         stream.on("data", function(chunk) {
//             parser.write(chunk.toString("utf8"));
//         });
//     });
//     msg.once("end", function() {
//         // console.log("Finished msg #" + seqno);
//         parser.end();
//     });
// }
const imap = new Imap({
  user: ExternalEmailAddress,
  password: ExternalPassword,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
});
// var imap = new Imap({
//     username: ExternalEmailAddress,
//     password: ExternalPassword,
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true
//   });
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}
function readforregscreen() {
  imap.once('ready', function () {
    openInbox(function (err, box) {
      if (err) throw err;
      var f = imap.seq.fetch('1:3', {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
        struct: true
      });
      f.on('message', function (msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function (stream, info) {
          var buffer = '';
          stream.on('data', function (chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function () {
            console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
        msg.once('attributes', function (attrs) {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function () {
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function (err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function () {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
  imap.once('error', function (err) {
    console.log(err);
  });
  imap.once('end', function () {
    console.log('Connection ended');
  });
  imap.connect();
}
// function openInbox(cb) {
//   imap.openBox('INBOX', true, cb);
// }
// function readforregscreen() {
//   console.log("In Readfor Reg function")
//   imaps.connect(config).then(function (connection) {
//     return connection.openBox('INBOX').then(function () {
//         var searchCriteria = [
//             'UNSEEN'
//         ];
//         var fetchOptions = {
//             bodies: ['HEADER', 'TEXT'],
//             markSeen: false
//         };
//         return connection.search(searchCriteria, fetchOptions).then(function (results) {
//             var subjects = results.map(function (res) {
//                 return res.parts.filter(function (part) {
//                     return part.which === 'HEADER';
//                 })[0].body.subject[0];
//             });
//             console.log(subjects);
//             // =>
//             //   [ 'Hey Chad, long time no see!',
//             //     'Your amazon.com monthly statement',
//             //     'Hacker Newsletter Issue #445' ]
//         });
//     });
// });
// }
exports.readforregscreen = readforregscreen;
