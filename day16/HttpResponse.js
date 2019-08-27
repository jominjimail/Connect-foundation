const CRLF = '\r\n\r\n';

class HttpResponse{
    constructor(){
        this.data = undefined;
        this.head = undefined;
        this.body = undefined;
        this.body_length = 0;
    }
}

HttpResponse.prototype.getData = function(data){
    this.data = data.toString();
    const temp_data = this.data.split(CRLF);
    this.head = temp_data[0];
    this.body = temp_data[1];
    console.log(this.head);
    //console.log(this.body);
    this.body_length = Buffer.from(this.body).length;
    console.log(this.body_length);
}   

module.exports = HttpResponse;