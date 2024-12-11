require('dotenv').config(); // SUPPORT .ENV FILES
const express          = require('express');
const app              = express(); // INITIALIZE APP
const path             = require('path');
const bodyParser       = require('body-parser');
const exphbs           = require('express-handlebars');

const http             = require('http'); // USED TO CREATE THE HTTP SERVER
const server           = http.createServer(app); // CREATE HTTP SERVER USING APP
const port             = process.env.PORT || 4200; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIALBE

const logger           = require('morgan'); // TERMINAL LOGGER
const session          = require('express-session'); // HANDLE SESSIONS
const passport         = require('passport'); // HANDLE AUTH
const fileUpload       = require('express-fileupload')
const flash            = require('connect-flash') // FLAASH MESSAGES
const mongoose         = require('mongoose');
const expressValidator = require('express-validator');

// ROUTES
const api = require('./routes/api-1.0.0');

global.db = require('./config/database');

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

//CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// SECURITY
app.disable('x-powered-by');

// USE ROUTES
api(app);

// SET PORT
app.set('port', port);
// server.listen(port);
server.listen(port, '127.0.0.1');
console.log('Server listening on port http://localhost:' + port);

// ERROR HANDLER
app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500).send(err.stack);
})

app.get('*', (req, res, next) => {
	// res.send('hello world');
	res.redirect('/');
});

module.exports = app;