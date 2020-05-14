const contentful = require('contentful');
const contentfulmngt = require('contentful-management')

const spaceID = '<Add Space ID here>'
const client = contentful.createClient({
  space: '<Add Space ID here>',
  accessToken: '<Add access token>',
});
const contentfulclient = contentfulmngt.createClient({
  accessToken: '<Add access token>',
})
let value = null;
let arr;

module.exports = {
  initialize(contentType, contentID) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        // 'content_type': 'legalContent'
        content_type: contentType,
      })
        .then((entries) => {
          //   console.log (JSON.stringify(entries));
          entries.items.forEach((entry) => {
            if (entry.fields.legalContentId === contentID) {
              value = JSON.stringify(entry.fields.content);
              return resolve(value.replace('\n', ''));
            }
            return undefined
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },

  termsOfUse(contentType, contentID) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: contentType,
      })
        .then((entries) => {
          entries.items.forEach((entry) => {
            if (entry.fields.legalContentId === contentID) {
              value = JSON.stringify(entry.fields.title);
              return resolve(value.replace('\n', ''));
            }
            return undefined
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },

  privacy(contentType, contentID) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: contentType,
      })
        .then((entries) => {
          entries.items.forEach((entry) => {
            if (entry.fields.legalContentId === contentID) {
              value = JSON.stringify(entry.fields.title);
              return resolve(value.replace('\n', ''));
            }
            return undefined
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },

  legalContentLink(contentType, contentID) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        content_type: contentType,
      })
        .then((entries) => {
          entries.items.forEach((entry) => {
            if (entry.fields.legalContentId === contentID) {
              value = JSON.stringify(entry.fields.title);
              return resolve(value.replace('\n', ''));
            }
            return undefined
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },

  updateTermsVersion(entryID, version) {
    return new Promise((resolve, reject) => {
      contentfulclient.getSpace(spaceID)
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.getEntry(entryID))
        .then((entry) => {
          const val = entry
          val.fields.acceptanceVersion.en = version
          val.update()
          return resolve(console.log(`Entry ${entry.sys.id} updated.`))
        })
        .catch((err) => {
          console.log('Cannot update version in contentful', err);
          return reject(err);
        });
    })
  },

  Medication(contentType) {
    const medarr = [];
    return new Promise((resolve, reject) => {
      client.getEntries({
        // 'content_type': 'legalContent'
        content_type: contentType,
      })
        .then((entries) => {
          entries.items.forEach((entry) => {
            value = `${entry.fields.drug} (${entry.fields.activeIngredient})`;
            medarr.push(value)
            return resolve(medarr)
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },
  MedicationTotal(contentType) {
    return new Promise((resolve, reject) => {
      client.getEntries({
        // 'content_type': 'legalContent'
        content_type: contentType,
      })
        .then((entries) => {
          entries.items.forEach((entry) => {
            value = `${entry.fields.drug} (${entry.fields.activeIngredient})`;
            return resolve(entries.total)
          });
        })
        .catch((err) => {
          console.log('Inside initialize error', err);
          return reject(err);
        });
    });
  },
  getentryID() {
    return new Promise((resolve, reject) => {
      contentfulclient.getSpace(spaceID)
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.getEntries({ content_type: 'legalContentWrapper' }))
        .then((response) => {
          const rep = response.items
          arr = rep[0]
          return resolve(arr.sys.id)
        })
        .catch((err) => {
          console.log('Cannot fetch entry ID', err);
          return reject(err);
        });
    })
  },
  getAcceptanceversion() {
    return new Promise((resolve, reject) => {
      contentfulclient.getSpace(spaceID)
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.getEntries({ content_type: 'legalContentWrapper' }))
        .then((response) => {
          const rep = response.items
          arr = rep[0]
          return resolve(arr.fields.acceptanceVersion.en)
        })
        .catch((err) => {
          console.log('Cannot fetch acceptance version', err);
          return reject(err);
        });
    })
  },
  publishcontent(entryID) {
    return new Promise((resolve, reject) => {
      contentfulclient.getSpace(spaceID)
        .then(space => space.getEnvironment('master'))
        .then(environment => environment.getEntry(entryID))
        .then((entry) => {
          entry.publish()
          return resolve(console.log(`Entry ${entry.sys.id} published.`))
        })
        .catch((err) => {
          console.log('Cannot publish acceptance version', err);
          return reject(err);
        });
    })
  },
  getHCPCodes() {

  },
};
