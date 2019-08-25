function httpRequest(host,method = 'GET'){
    this.host = host;
    this.method = method;
    this.http_string = 
    `GET / HTTP/1.1\r\nAccept: text/html\r\nHost: ${this.host}\r\nUser-Agent: Mozilla/5.0\r\n\r\n`;
}

module.exports = httpRequest;