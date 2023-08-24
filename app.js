var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var childrentoyRouter = require('./routes/childrentoy');
var adulttoyRouter = require('./routes/adulttoy');

var app = express();
//khai báo body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// cấu hình mongoose (làm việc và tương tác với DB)
var mongoose = require('mongoose');
//note: cần khai báo db name trong uri. vd: "asm2"
var db = "mongodb+srv://trungdtgch210921:Thetrung%40123789@cluster0.vvv4pm7.mongodb.net/asm2";
mongoose.connect(db)
    .then(() => console.log('ok'))
    .catch((error) => console.log('failed'));

//khai báo dateFormat & equal của hbs
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//khai báo router (2)
app.use('/childrentoy', childrentoyRouter);
app.use('/adulttoy', adulttoyRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//khai báo port
app.listen(process.env.PORT || 3001);

module.exports = app;