const Imap = require('imap');
const { inspect } = require('util');
const fs = require('fs');
const fileutils = require('../utils/fileoperations');
const data = fileutils.readMobileCaps()[0] || {};
const { ExternalEmailAddress, ExternalPassword } = data;
const regex = '(^http|https)((([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))'
const imap = new Imap({
  user: ExternalEmailAddress,
  password: ExternalPassword,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  authTimeout: 3000,
  tlsOptions: { rejectUnauthorized: false },
});
function readforforgotpassword() {
  imap.connect();
  let body = '';
  let header = '';
  const parsedMsg = {};
  return new Promise((resolve, reject) => {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err) => {
        if (err) throw err;
        imap.search(['UNSEEN', ['SUBJECT', 'Reset your Madelyne password']], (err1, results) => {
          const messages = [];
          if (err1) throw err1;
          const imapFetch = imap.fetch(results, {
            id: 1,
            bodies: 'TEXT',
            struct: false,
          });
          imapFetch.on('message', (msg, seqno) => {
            const prefix = `(#${seqno}) `;
            msg.on('body', (stream, info) => {
              console.log(prefix + 'Body');
              if (info.which === 'TEXT' || info.which === '1.TEXT') {
                stream.on('data', (chunk) => {
                  body += chunk.toString('utf8');
                });
                stream.once('end', () => { parsedMsg.body = body; });
              } else {
                stream.on('data', (chunk) => { header += chunk.toString('utf8'); });
                stream.once('end', () => { parsedMsg.header = Imap.parseHeader(header); });
              }
            });
            msg.once('attributes', function (attrs) {
              console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
              parsedMsg.attrs = attrs;
            });
            msg.once('attributes', (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ['\\Seen'], (err1) => {
                if (err1) {
                  console.log('Error marking the email as read:\n', `${err1}`);
                } else {
                  console.log('Marked the email as read successfully!!');
                }
              });
            });
            msg.once('end', () => {
              console.log(`${prefix}Finished`);
              messages.push(parsedMsg);
            });
          });
          imapFetch.once('error', (err2) => {
            console.log(`Fetch error: ${err2}`);
            return reject(err2);
          });
          imapFetch.once('end', () => {
            console.log('Done fetching all messages!');
            for (const i in messages) {
              const completemessage = inspect(messages[i], false, 4);
              const striphtmltag = completemessage.replace(/<(?:.|\n\r|\r\n|\\n)*?>/, '');
              console.log('Body Text Message:\n', `${body.slice(striphtmltag)}`);
              if (body.includes('https')) {
                const geturl = new RegExp(regex, 'g');
                const checkURL = body.match(geturl);
                const completeURL = checkURL;
                console.log(`URL to perform reset password:${completeURL}`);
                const tostringval = completeURL.toString();
                const splitofurl = tostringval.split(',');
                console.log('The code in the URL:' + splitofurl[splitofurl.length - 1]);
                fs.writeFile('./test/testdata/urlforforgotpassword.txt', splitofurl[splitofurl.length - 1], { flag: 'w' }, (err2) => {
                  if (err2) throw err2;
                  console.log('File has been created & saved successfully!');
                });
              } else {
                console.log('Unable to open the URL mentioned');
              }
              imap.end();
              return resolve(body);
            }
            return undefined
          });
        });
      });
    });
    imap.once('error', (err) => {
      console.log(err);
    });
    imap.once('end', () => {
      console.log('Connection ended');
    });
  });
}
function readforresendforgotpassword() {
  imap.connect();
  let body = '';
  let header = '';
  const parsedMsg = {};
  return new Promise((resolve, reject) => {
    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err) => {
        if (err) throw err;
        imap.search(['UNSEEN', ['SUBJECT', 'Reset your Conductor password']], (err1, results) => {
          const messages = [];
          if (err1) throw err1;
          const imapFetch = imap.fetch(results, {
            id: 1,
            bodies: 'TEXT',
            struct: false,
          });
          imapFetch.on('message', (msg, seqno) => {
            const prefix = `(#${seqno}) `;
            msg.on('body', (stream, info) => {
              if (info.which === 'TEXT') {
                stream.on('data', (chunk) => {
                  body += chunk.toString('utf8');
                });
                stream.once('end', () => { parsedMsg.body = body; });
              } else {
                stream.on('data', (chunk) => { header += chunk.toString('utf8'); });
                stream.once('end', () => { parsedMsg.header = Imap.parseHeader(header); });
              }
            });
            msg.once('attributes', (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ['\\Seen'], (err2) => {
                if (err2) {
                  console.log('Error marking the email as read:', `${err2}`);
                } else {
                  console.log('Marked the email as read successfully!!');
                }
              });
            });
            msg.once('end', () => {
              console.log(`${prefix}Finished`);
              messages.push(parsedMsg);
            });
          });
          imapFetch.once('error', (err2) => {
            console.log(`Fetch error: ${err2}`);
            return reject(err2);
          });
          imapFetch.once('end', () => {
            console.log('Done fetching all messages!');
            for (const i in messages) {
              const completemessage = inspect(messages[i], false, 4);
              const striphtmltag = completemessage.replace(/<(?:.|\n\r)*?>/, '');
              console.log('Body Text Message:', `${body.slice(striphtmltag)}`);
              if (body.includes('https')) {
                const geturl = new RegExp(regex, 'g');
                const checkURL = body.match(geturl);
                const completeURL = `${checkURL}&mode=resetpassword`;
                console.log(`URL to perform reset password:${completeURL}`);
                fs.writeFile('./test/testdata/urlforforgotpassword.txt', completeURL, { flag: 'w' }, (err2) => {
                  if (err2) throw err2;
                  console.log('File has been created & saved successfully!');
                });
              } else {
                console.log('Unable to open the URL mentioned');
              }
              imap.end();
              return resolve(body);
            }
            return undefined
          });
        });
      });
    });
    imap.once('error', (err) => {
      console.log(err);
    });
    imap.once('end', () => {
      console.log('Connection ended');
    });
  });
}
exports.readforresendforgotpassword = readforresendforgotpassword;
exports.readforforgotpassword = readforforgotpassword;
