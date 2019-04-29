const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const compression = require('compression');

const controllers = require('./controllers/router');

const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 4000);
app.use(compression());
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'assets', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', '..', 'public'), { maxAge: '30d' }));
app.use(controllers);

module.exports = app;
