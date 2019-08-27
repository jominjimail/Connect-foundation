const URL = require('./URL.js');
var dns = require('dns');
var net = require('net');
var HttpRequest = require('./HttpRequest.js');
var HttpResponse = require('./HttpResponse.js');

let request = new HttpRequest();
let response = new HttpResponse();

try{
    var zum = new URL("http://zum.com");
    
    dns.lookup(zum.hostname, (error, address, family)=> {
        if (error){ 
            throw error;
        }
        request.process(zum.hostname, 'GET');

        let temp_buffer = [];
        let socket = net.connect(zum.port, address, function(){

            console.log('CONNECTED TO: ' + address + ':' + zum.port);
            console.log(request.msg);
            socket.write(request.msg);
            socket.on('data', (data) =>{  
                temp_buffer.push(data);
            })
            socket.on('end', ()=>{
                response.getData(Buffer.concat(temp_buffer));
            })
        } )
    })

}catch(e){
    console.log(e);
}
