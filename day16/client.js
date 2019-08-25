var net = require('net');

var client = net.connect({port : 1337},function(){
    console.log('client connect to server succ');
});

client.on('data', function(data){
    console.log(data.toString());
    client.end();
});

client.on('end', function(){
    console.log('client discconnecte from server succ');
})