const express = require('express');
const path = require('path');

const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const helpers = require('./views/helpers/index');

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
app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers: helpers,
  })
);

module.exports = app;
