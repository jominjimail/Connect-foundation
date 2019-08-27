const equal_state = {
    1 : '1 : scheme부터 username, password, host:port까지 같은 상태',
    2 : '2 : scheme과 host:port만 같은 상태 (username, password 제외)',
    3 : '3 : scheme부터 path까지만 모두 같은 상태',
    4 : '4 : 완벽하게 같은 상태',
    5 : '5 : 그 외 서로 다른 상태'
}

class URL {
    constructor(url){
        this.result = this.parseUrl(url);
    }

    parseUrl(url){
        const regex = /^(([^:\/?#]+:)?(\/\/((([^\/?#:]*)?(?:\:([^\/?#:]*))?\@)?([^\/?#:]*)(?::([^\/?#:]*))?)))(([^?]*)(?:\?([^#]*))?)/gm;
        var matches = regex.exec(url);
       
        if(matches === null){
            throw "invalid url parameter";
        }
        const r = {
            href: matches[0] || "",
            protocol: matches[2] || "",             
            username: matches[6] || "",            
            password: matches[7] || "",                
            hostname : matches[8] || "", 
            port: matches[9] ? matches[9] : "80",    
            path: matches[10] || "",                
            pathname: matches[11] || (matches[8] ? "/" : ""),
            query: matches[12] || "",              
            origin: matches[1] || "",               
            auth : matches[5] || "",
            
        };
        
        return r;

    }
    get hostname(){
        return this.result.hostname;
    }
    get port(){
        return this.result.port;
    }

}
module.exports = URL;

