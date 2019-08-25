var net = require('net');

var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.on('end', function(){
        console.log('client disconnected succ');
    })
	socket.pipe(socket);
});

server.listen(80, function(){
    
    console.log('server is listening ');
    console.log('server bound address ', server.address());
});