const CRLF = '\r\n\r\n';

class HttpRequest{
    constructor(){
        this.host = undefined;
        this.method = undefined;
    }
    get msg(){
        return `${this.method} / HTTP/1.1\r\nAccept: text/html\r\nHost: ${this.host}\r\nUser-Agent: Mozilla/5.0${CRLF}`;
    }
}

HttpRequest.prototype.process = function(host, method = 'GET') {
    this.host = host;
    this.method = method;
}

module.exports = HttpRequest;