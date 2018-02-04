require('dotenv').config();
const debug = require('debug')('ui5con-open-reg-watcher');
const Crawler = require('crawler');

const express = require('express');
const app = express();

if (process.env.MAX_CONNECTIONS === undefined) {
  debug('Environment variable for MAX_CONNECTIONS not set. Please set in .env file and try again!');
  process.exit(1);
}

if (process.env.RATE_LIMIT === undefined) {
  debug('Environment variable for RATE_LIMIT not set. Please set in .env file and try again!');
  process.exit(1);
}

if (process.env.SITE_TO_CRAWL === undefined) {
  debug('Environment variable for SITE_TO_CRAWL not set. Please set in .env file and try again!');
  process.exit(1);
}

const iMaxConnections = process.env.MAX_CONNECTIONS;
const iRateLimit = process.env.RATE_LIMIT;
const sSiteToCrawl = process.env.SITE_TO_CRAWL;

const crawl = new Crawler({
  maxConnections: iMaxConnections,
  rateLimit: iRateLimit
});

const data = {
  registrationStatus: '',
  timestamp: 0
};

app.use('/', express.static('public'));
app.get('/api/v1/checkRegistration', (req, res) => {
  updateData().then((data) => {
    res.json(data);
  });
});

updateData().then((data) => {
  app.listen(3000, () => {
    debug('Server listening on port 3000...');
  });
});

function updateData() {
  return new Promise((resolve, reject) => {
    crawl.queue({
      uri: sSiteToCrawl,
      callback: (error, res, done) => {
        if (error) {
          debug('Error occured during crawl: %s', JSON.stringify(error));
          reject(error);
          return;
        } else {
          const $ = res.$;
          const sTexts = $.text().toLowerCase();
          const aLinks = $('a'); //jquery get all hyperlinks
          let bRegistrationOpen = false;
          let bEventbriteLinkFound = false;
          $(aLinks).each(function(i, link) {
            const sLink = $(link).attr('href');
            if (sLink && sLink.search('eventbrite.de') !== -1) {
              debug($(link).text() + ':\n' + $(link).attr('href'));
              bEventbriteLinkFound = true;
            }
          });
          if (sTexts.search('registration') !== -1) {
            bRegistrationOpen = true;
          }
          if (bRegistrationOpen && bEventbriteLinkFound) {
            data.registrationStatus = 'open';
            data.timestamp = new Date().getTime();
            debug('Registration seems to be open!!! :)');
            debug(data);
            resolve(data);
          } else {
            data.registrationStatus = 'not open';
            data.timestamp = new Date().getTime();
            debug('Registration seems not to be open :(');
            debug(data);
            resolve(data);
          }
        }
        done();
      }
    });
  });
}
