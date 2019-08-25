const URL = require('./URL.js');
var dns = require('dns');
var net = require('net');
var HttpRequest = require('./HttpRequest.js');
var HttpResponse = require('./HttpResponse.js');

let response = new HttpResponse();
//121.189.40.10:80

try{
    var zum = new URL("http://zum.com");
    dns.lookup(zum.host, (error, address, family)=> {
        console.log(error);
        if (error){ throw error; }
        var requestmsg = new HttpRequest(zum.host);
        
        let temp_buf = [];
        let socket = net.connect(zum.port, address, function(){

            console.log('CONNECTED TO: ' + address + ':' + zum.port);
            console.log(requestmsg.http_string);
            socket.write(requestmsg.http_string);

            socket.on('data', (data) =>{     
                temp_buf.push(data);
            })
            socket.on('end', ()=>{
                response.getData(Buffer.concat(temp_buf));
            })
        } )

    })

}catch(e){
    console.log(e);
}
