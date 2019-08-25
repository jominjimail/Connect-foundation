//출처 : https://www.tutorialspoint.com/nodejs/nodejs_express_framework
var todolist = require("./data.json");
var express = require('express');
var fs = require('fs');

var app = express();
var port = 8090;


app.get('/', function (req, res) {
   res.send(todolist);
})

var server = app.listen(port, function () {
   var host = server.address().address
   
   console.log("Example app listening at http://%s:%s", host, port)
})