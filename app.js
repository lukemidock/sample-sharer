var express = require("express");
var path = require("path");

//initialize express app
var app = express();
var port = 8080;
app.use(express.static("."));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.listen(port, function() {
  console.log("Server running on port", port);
});
