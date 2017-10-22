# Twitter bot
🤖 Today's national election(s) around the world. Data from @IFES1987, @cmonagle for questions.

Scrapes http://www.electionguide.org/elections/upcoming/?inst=&cont=&yr=

Live at https://twitter.com/todays_election.

Run `node index.js` on a cron job daily. 

Add a config.js file in the root with your Twitter credentials:
```js
module.exports.config= {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  }
```