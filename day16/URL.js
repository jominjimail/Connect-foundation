//url.host = "boostcamp.connect-foundation.or.kr"
//url.lastPathComponent = "last"
//url.pathComponents = ["/", "first", "second", "last"]
//url.port = 2019
//url.query = "query=ab&param=12"
//url.scheme = "http"
//url.isFileURL = false
//url.user = "user_name"
//url.password = "pass-word"
//url.absoluteString = "http://user_name:pass-word@boostcamp.connect-foundation.or.kr:2019/first/second/last?query=ab&param=12"

const equal_state = {
    1 : '1 : scheme부터 username, password, host:port까지 같은 상태',
    2 : '2 : scheme과 host:port만 같은 상태 (username, password 제외)',
    3 : '3 : scheme부터 path까지만 모두 같은 상태',
    4 : '4 : 완벽하게 같은 상태',
    5 : '5 : 그 외 서로 다른 상태'
}

class URL {
    constructor(url){
        this.parseUrl(url);
    }

    parseUrl(url){
        const m = url.match(/^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/);
        const r = {
            hash: m[10] || "",                   // #asd
            host: m[3] || "",                    // localhost:257
            hostname: m[6] || "",                // localhost
            href: m[0] || "",                    // http://username:password@localhost:257/deploy/?asd=asd#asd
            origin: m[1] || "",                  // http://username:password@localhost:257
            pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
            port: m[7] || "",                    // 257
            protocol: m[2] || "",                // http:
            search: m[9] || "",                  // ?asd=asd
            username: m[4] || "",                // username
            password: m[5] || ""                 // password
        };

        console.log(r);
 
    }
}
// function URL(url){
//     this.host = '';
//     this.lastPathComponent = '';
//     this.pathComponents = ["/"];
//     this.port = '80';
//     this.query = '';
//     this.scheme = 'http';
//     this.isFileURL = false;
//     this.user = '';
//     this.password = '';
//     this.absoluteString = url;

//     this.appendPathComponent = (path_str) => {
//         this.pathComponents.push(path_str);
//         this.lastPathComponent = path_str;
//         this.refactory();
//     }

//     this.deleteLastPathComponent = () => {
//         let last = this.lastPathComponent;

//         if(last === ''){
//             console.log(' can`t delete ');
//             return ;
//         }
//         let new_pathComponents = this.pathComponents.filter(path => path !== last);
//         this.pathComponents = new_pathComponents;
//         let l = this.pathComponents.length;

//         if(l === 1){
//             this.lastPathComponent = '';
//         }else{
//             this.lastPathComponent = this.pathComponents[l-1];
//         }   
        
//         this.refactory();
//     }

//     this.refactory = () =>{
//         let new_absoluteString = `${this.scheme}://`;
//         if(this.user !== '' && this.password !== ''){
//             new_absoluteString += (this.user + ':' + this.password + '@');
//         }else if(this.user !== ''){
//             new_absoluteString += (this.user + '@');
//         }

//         new_absoluteString += this.host;
//         if(this.port !== ''){
//             new_absoluteString += (':' + this.port);
//         }

//         if(this.lastPathComponent !== ''){
//             let new_path = '';
//             for(let i=1;i<this.pathComponents.length;i++){
//                 new_path += ('/'+this.pathComponents[i]);
//             }
//             new_absoluteString += new_path;
//         }

//         if(this.query !== ''){
//             if(this.lastPathComponent === '') new_absoluteString += '/';
//             new_absoluteString += ('?' +this.query);
//         }
       
//         this.absoluteString = new_absoluteString;

//     }

//     this.isEqual = (other) => {
//         if(this.scheme === other.scheme && this.user === other.user && 
//             this.password === other.password && this.host === other.host &&
//             this.port === other.port){
//                 //JSON.stringify(a)==JSON.stringify(b)
//                 if(JSON.stringify(this.pathComponents) == JSON.stringify(other.pathComponents)){
//                     //3,4
//                     if(this.query === other.query){
//                         return equal_state[4];
//                     }else{
//                         return equal_state[3];
//                     }
//                 }else{
//                     return equal_state[1];
//                 }
//             }else{
//                 if(this.scheme === other.scheme && this.host === other.host && this.port === other.port){
//                     return equal_state[2];
//                 }else{
//                     return equal_state[5];
//                 }
//             }
//     }

//     this.analyzer = (url) => {
//         let scheme = url.split("://");

//         if(scheme.length === 1){
//             throw new Error("you shoud input the scheme information");
//         }
//         this.scheme = scheme[0];

//         let other = scheme[1];
//         let pos = find_pos(other, '/');

//         if(pos === -1){
//             other += '/';
//             pos = find_pos(other,'/');
//         }

//         let autority = other.slice(0,pos);
//         let resource = other.slice(pos+1);

//         this.autorityAnalyzer(autority);
//         this.resourceAnalyzer(resource);

//     };

//     this.autorityAnalyzer = (autority) => {
//         let s = autority.split('@');
//         let host ;

//         if(s.length === 2){
//             let userinfo = s[0];
//             host = s[1];

//             let u = userinfo.split(':');
//             if(u.length === 1){
//                 this.user = u[0];
//             }else{
//                 this.user = u[0];
//                 this.password = u[1];
//             }
//         }else{
//             host = s[0];
//         }
//         let h = host.split(':');
    
//         if(h[0] === ''){
//             throw new Error("you shoud input the host information");
//         }
//         if(h.length >1){

//             this.host = h[0];
//             this.port = h[1];
//         }else{
//             this.host = h[0];
//         }

//     };

//     this.resourceAnalyzer = (resource) => {
//         if(resource.length !== 0){
//             let path = [];
//             let query = [];
//             let r = resource.split('?')
            
//             if(r.length === 1){
//                 // 둘중..하나...
//                 let pq = r[0].split('/');
//                 if(pq.length > 1){
//                     // path
//                     path = pq;
//                 }else{
//                     // query
//                     query.push(r[0]);
//                 }
//             }else{
//                 // 둘다 있는거
//                 path = r[0].split('/');
//                 query.push(r[1]);
//             }

//             if(query.length !== 0){
//                 this.query = query[0];
//             }

//             for(let i=0;i<path.length;i++){
//                 if(path[i] !== ''){
//                     this.pathComponents.push(path[i]);
//                 }
//                 if(i === path.length-1 && path[i] !== ''){
//                     this.lastPathComponent = path[i];
//                 }
//             }
//         }
//     }



//     this.analyzer(url);
// }

// function find_pos(str,target){
//     let pos = -1;
//     for(let i=0;i<str.length;i++){
//         if(str[i] === target){
//             pos = i;
//             break;
//         }
//     }
//     return pos;
// }

module.exports = URL;

