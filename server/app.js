// import important modules
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var connection = require("./db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
var app = express();
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (request, response) => response.json("Hello World!"));
// verifies user's username and password
app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          console.log("match");
          request.session.loggedin = true;
          response.send({ success: true });
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      },
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

//registers a new user into database
app.post("/register", function (request, response) {
  console.log("I got a request");
  var postData = request.body;
  connection.query("INSERT INTO accounts SET ?", postData, function (
    error,
    results,
    fields,
  ) {
    if (error){ 
      console.log("I threw an error");
      throw error;}
    response.json({ success: true });
  });
});
// GETS EVERY USER ACCOUNT
app.get('/accounts', function (request, response) {
  connection.query('select * from accounts', function (error, results, fields) {
   if (error) throw error;
   response.json(results);
 });
});

//GETS TUTORIAL PROBLEMS
app.get("/tutorial/:level/section/:section", function (request, response) {
  connection.query(
    "SELECT * FROM tutorial WHERE level = ? AND section = ?",
    [request.params.level, request.params.section],
    function (error, results, fields) {
      if (error) throw error;
      response.json(results);
    },
  );
});

//GETS EXAMPLE PROBLEMS
app.get("/example/:level/section/:section", function (request, response) {
  connection.query(
    "SELECT * FROM example_problems WHERE level = ? AND section = ?",
    [request.params.level, request.params.section],
    function (error, results, fields) {
      if (error) throw error;
      response.json(results);
    },
  );
});

//GETS PRACTICE PROBLEMS
app.get("/practice/:level/section/:section", function (request, response) {
  connection.query(
    "SELECT * FROM practice_problems WHERE level = ? AND section = ?",
    [request.params.level, request.params.section],
    function (error, results, fields) {
      if (error) throw error;
      response.json(results);
    },
  );
});

//GETS TEST PROBLEMS
app.get("/test/:level/section/:section", function (request, response) {
  connection.query(
    "SELECT * FROM test_problems WHERE level = ? AND section = ?",
    [request.params.level, request.params.section],
    function (error, results, fields) {
      if (error) throw error;
      response.json(results);
    },
  );
});
// GETS TOPIC AND SUBTOPIC
app.get("/topics", function (request, response) {
  connection.query(
    "SELECT topics.topic_name, section.section_name FROM section JOIN topics ON section.topic_id = topics.topic_id ORDER BY topic_name, section_name;",
    function (error, results, fields) {
      if (error) throw error;
      response.json(results);
    },
  );
});

app.listen(PORT, () => console.log("app is running"));

/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;*/
