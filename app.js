var express = require("express");
var path = require("path");
var mysql = require("mysql");
var fs = require("fs");
var bodyparser = require('body-parser');
var uuidv4 = require('uuid/v4');
var formidable = require('formidable');


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

});









app.post("/uploadsample", function(req, res) {
    
	var query = req.body.uploaddata;
	
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = query.path;
      var newpath = 'C:\\Users\\rbegs\\OneDrive\\@Classes\\CS 275\\Final\\sample-sharer\\samples\\' + files.query.path.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
});





app.post("/fileupload", function(req, res) {
    var form = new formidable.IncomingForm();
    console.log(req.body);
    //console.log(form);
    form.parse(req, function (err, fields, files) {
        console.log(files);
        console.log(err);
        console.log(fields);
      var oldpath = files.filetoupload.path;
      var newpath = 'C:\\Users\\rbegs\\OneDrive\\@Classes\\CS 275\\Final\\sample-sharer\\samples\\' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
    
    
});





app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/upload", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/upload.html"));
});

app.listen(port, function() {
  console.log("Server running on port", port);
});



