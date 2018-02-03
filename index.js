require('dotenv').config();
const debug = require('debug')('ui5con-open-reg-watcher');
const Crawler = require('crawler');

const iMaxConnections = process.env.MAX_CONNECTIONS;
const iRateLimit = process.env.RATE_LIMIT;
const sSiteToCrawl = process.env.SITE_TO_CRAWL;

const crawl = new Crawler({
  maxConnections: iMaxConnections,
  rateLimit: iRateLimit
});

crawl.queue({
  uri: sSiteToCrawl,
  callback: (error, res, done) => {
    if (error) {
      debug('Error occured during crawl: %s', JSON.stringify(error));
    } else {
      const $ = res.$;
      const sTexts = $.text().toLowerCase();
      const aLinks = $('a'); //jquery get all hyperlinks
      let bRegistrationOpen = false;
      let bEventbriteLinkFound = false;
      $(aLinks).each(function(i, link) {
        const sLink = $(link).attr('href');
        if (sLink.search('eventbrite.de') !== -1) {
          debug($(link).text() + ':\n  ' + $(link).attr('href'));
          bEventbriteLinkFound = true;
        }
      });
      if (sTexts.search('registration') !== -1) {
        bRegistrationOpen = true;
      }
      if (bRegistrationOpen && bEventbriteLinkFound) {
        debug('Registration was found on page');
      } else {
        debug('Registration seems not to be opened till now');
      }
    }
    done();
  }
});
