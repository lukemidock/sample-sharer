var express = require("express");
var path = require("path");
var mysql = require("mysql");
var request = require('request');
var fs = require("fs");
var bodyparser = require('body-parser');
var uuidv4 = require('uuid/v4')


//initialize express app
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
var port = 8080;
app.use(express.static("."));

//initialize mysql connection



pool = mysql.createPool({
  "connectionLimit": 10,
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "Pass275word",
  "database": "simplesharer",
  "timezone": 'utc',
  // Enables query format like this: 
  // `connection.query("UPDATE x SET col=:v1" , { v1: 999 }, ...`
  //
  // NOTE: How to insert binary data:
  // ```
  // // Read BLOB:
  // pool.query(`SELECT * FROM example`, function(err, res) {
  //   const buf = new Buffer(res[0].data); // `data` column type is BLOB! 
  //   // Write BLOB:
  //   pool.query("INSERT INTO example(data) VALUES(BINARY(:buf))", { buf }, ...);
  // }
  // ```
  /*queryFormat: function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  }*/

});





app.get("/samples", function(req, res) {
  pool.query("select * from samples", function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
  });
    
});


app.post("/uploadsample", async function(req, res) {
    
	var query = req.body;
	query.id = uuidv4();
    query.data = readpFile("mp3samples\\"+ query.data);
    console.log(query);
    
    
    
    //pool.query("INSERT INTO `samples`(data) VALUES (BINARY(:data), (:name),(:genre),(:category),(:key), (:tempo))", { data, name, genre, category, key, tempo}, function(err, res) {
    pool.query('INSERT INTO samples SET ?', query, function (err, res) {
  if (err) throw err;
        console.log("BLOB data inserted!");
    });
});

app.get("/upload_sample", function(req, res) {});


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/upload", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/upload.html"));
});

app.listen(port, function() {
  console.log("Server running on port", port);
});


function readpFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
    console.log(bitmap);
  const buf = new Buffer(bitmap);
  return buf;
}

