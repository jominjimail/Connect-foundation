//출처 : https://www.tutorialspoint.com/nodejs/nodejs_express_framework
var express = require('express');
var fs = require('fs');

var app = express();
var port = 9000;


app.get('/', function (req, res) {
    var text = fs.readFileSync("../DashBoard.json");
    res.send(JSON.parse(text));
})

app.get('/:username',function (req, res){
    let username = req.params.username;
    var text = fs.readFileSync("../DashBoard.json");
    let total = JSON.parse(text);
    let result = total.map(item => {
        if(item.custom_id === username){
            return item;
        }
    });
    res.send(result);

})



var server = app.listen(port, function () {
   var host = server.address().address
   
   console.log("Example app listening at http://%s:%s", host, port)
})