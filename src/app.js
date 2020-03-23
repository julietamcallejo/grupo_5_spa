// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const usersApiRouter = require('./routes/api/usersApiRouter');
const productsApiRouter = require('./routes/api/productsApiRouter');
const imagesRouter = require('./routes/imagesRouter');
const session = require('express-session');
const userCookieParser = require('./middlewares/userCookieMiddleware');

//const expressValidator = require('express-validator');

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'register-login',
  resave: false,
  saveUninitialized: true
}));
app.use(userCookieParser);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Seteo de la ubicación de la carpeta "views"

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', usersRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productsApiRouter);
app.use('/images', imagesRouter);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
