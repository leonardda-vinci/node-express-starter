const promise = require('bluebird');
const options = {
	promiseLib: promise,
	query: (e) => {
		console.log(e.query);
	}
};

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const db = new pg.Client(connectionString);

db.connect((err, client) => {
	console.log("Connecting to Database...");
	if (err) {
		console.log(err);
	} else {
		console.log('SUCCESS');
		client.on('notification', (msg) => {
			 // console.log(msg);
      /*
      switch (msg.channel) {
        case 'eodchannel': {
          if (msg.payload === '') {
            io.emit('message', { app: 'eod', event: 'log' });
          } else {
            io.emit('message', { app: 'eod', event: 'end' });
          }
          break;
        }
        case 'sms_export': {
          io.emit('message', { app: 'export', event: msg.payload });
          break;
        }
        case 'sms_import': {
          io.emit('message', { app: 'import', event: msg.payload });
          break;
        }
        case 'sms_shelftag': {
          io.emit('message', { app: 'shelftag', event: msg.payload });
          break;
        }
      }
      */
		});
		/*
    let query = client.query('LISTEN eodchannel');
    query = client.query('LISTEN sms_export');
    query = client.query('LISTEN sms_import');
    query = client.query('LISTEN sms_shelftag');
    */
	}
});

module.exports = db;