var express = require("express");
var path = require("path");
var mysql = require("mysql");

//initialize express app
var app = express();
var port = 8080;
app.use(express.static("."));

//initialize mysql connection
<<<<<<< HEAD


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
  queryFormat: function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  }
=======
var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  data: "samples"
>>>>>>> d484e5c328d78e9674c8b85db102a0ad11d694c5
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
  sqlquery = "SELECT * FROM samples WHERE ";
  con.query(sqlquery, function(err, rows, fields) {
    if (err) {
      console.log("Error during query processing");
    } else {
      console.log("Query successful");
      res.send(rows);
    }
  });
  res.end();
});

<<<<<<< HEAD
app.post("/sample_upload", function(req, res) {
    const data = readImageFile(req.query.file);
    name = req.query.name
    genre = req.query.genre
    category = req.query.category
    key = req.query.key
    tempo = = req.query.tempo
    
    pool.query("INSERT INTO `samples`(data) VALUES (BINARY(:data), (:name),(:genre),(:category),(:key), (:tempo))", { data, name, genre, category, key, tempo}, function(err, res) {
  if (err) throw err;
  console.log("BLOB data inserted!");
    
    
    
});
=======
app.get("/upload_sample", function(req, res) {});
>>>>>>> d484e5c328d78e9674c8b85db102a0ad11d694c5

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/upload", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/upload.html"));
});

app.listen(port, function() {
  console.log("Server running on port", port);
});


function readFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const buf = new Buffer(bitmap);
  return buf;
}
