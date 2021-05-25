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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get user Mode data
// req.body will include a user_id
app.get("/mode-info", (req, res) => {
  connection.query(
    "SELECT * FROM mode WHERE user_id = ?",
    [req.body],
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        res.send({ result: results });
      }
    },
  );
});

// inserts user Mode data
// req.body will include an object containing a mode object (without the modeSession array), and user_id
app.post("/mode", (req, res) => {
  connection.query("INSERT mode SET ?"[req.body]);
  res.end();
});

// inserts user ModeSession data
// req.body will include an object containing an array of modeSessions, and mode_id
app.post("/mode-session", (req, res) => {
  connection.query(
    "INSERT mode_session(mode_id, id, question, answer, explanation, user_answer) VALUES ?"[
      req.body
    ],
  );
  res.end();
});

// get user ModeSession data
// req.body will include a mode_id
app.get("/mode-session-info", (req, res) => {
  connection.query(
    "SELECT * FROM mode_session WHERE mode_id = ?",
    req.body,
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        res.send({ result: results });
      }
    },
  );
});

// verifies that the new user's email is unique
// req.body will include an email address
app.get("/unique/:email", (req, res) => {
  connection.query(
    "SELECT EXISTS(SELECT * FROM accounts WHERE email = ?)",
    [req.params.email],
    (error, results, fields) => {
      if (error) {
        throw error;
      } else {
        // if (results == 0) {
        //   res.send({ isUnique: true });
        // } else {
        //   res.send({ isUnique: false });
        // }
        res.send({ isUnique: results });
      }
    },
  );
});

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
          request.session.loggedin = true;
          response.send({ success: true, result: results });
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
  connection.query(
    "INSERT INTO accounts SET ?",
    postData,
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      response.json({ success: true, result: results });
    },
  );
});
// GETS EVERY USER ACCOUNT
app.get("/accounts", function (request, response) {
  connection.query("select * from accounts", function (error, results, fields) {
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
