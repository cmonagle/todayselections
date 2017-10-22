const twitter = new require('twitter')(require('./config').config);
const scrapeIt = require('scrape-it');
const {flag} = require('country-emoji');


const URL = `http://www.electionguide.org/elections/upcoming/?inst=&cont=&yr=`;
const SELECTOR = `#datagrid tbody tr`;

const data = {
  country: 'td:nth-child(2) a',
  election: 'td:nth-child(3) a',
  url: {
    selector: 'td:nth-child(3) a',
    attr: 'href',
    convert: path => `http://www.electionguide.org${path}`
  },
  date: {
    selector: 'td:nth-child(4)',
    convert: date => new Date(date)
  }
};

scrapeIt(URL, {
  elections: {
    listItem: SELECTOR,
    data
  }
}).then(({elections}) => {
  elections = elections.filter( ({date}) => isToday(date));
  if (elections.length === 0) throw 'No elections today 💤.';

  elections.forEach(election=> sendTweet(election) );
}).catch(err =>  console.log(err) );

const isToday = date => { 
  const today = new Date();
  return date.getUTCFullYear() === today.getUTCFullYear()
  && date.getUTCMonth() === today.getUTCMonth()
  && date.getUTCDate() === today.getUTCDate();
}

const sendTweet = ({country, url, election}) => {
  const status = `${flag(country)} ${country} is holding elections today for ${election}. More info: ${url}`;

  twitter.post('statuses/update', {status}, err => {
    if (err) throw err;
    console.log(`Successfully posted the following tweet: ${status}`);
  })
}

twitter.get('statuses/')