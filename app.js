var express = require("express");
var path = require("path");
var mysql = require("mysql");

//initialize express app
var app = express();
var port = 8080;
app.use(express.static("."));

//initialize mysql connection
var con = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  data: 'samples'
});
con.connect(function(err) {
  if (err) {
    console.log("Error connecting to database");
  } else {
    console.log("Database successfully connected");
  }
});

app.get("/samples", function(req, res) {
  res.send(req.query);
// sqlquery = "SELECT * FROM samples WHERE "
//con.query(sqlquery, function(err,rows,fields) {
//  if (err) {
//    console.log('Error during query processing');  
//  } else {
//    console.log('Query successful');
//    res.send(rows);
//  }
//});
  res.end();
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.listen(port, function() {
  console.log("Server running on port", port);
});
