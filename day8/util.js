//출처 : https://github.com/connect-foundation/day6-challenge/blob/gn05/todos.js
const uuidV1 = require('uuid/v1');
var fs = require('fs');

const util = {
    make_uniqueId(){
        return uuidV1();
    },
    delay(time){
        return new Promise(resolve => setTimeout(resolve, time));
    },
    update_jsonfile(data){
        let json = JSON.stringify(data);
        fs.writeFile('data.json', json, 'utf8', function(err) {
            if (err) throw err;
        });
    },
    content_htmlfile(current_string){
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TodoList Result</title>
</head>
<body>
<h1>todolist</h1>
    <div class="log">
        ${current_string} 
    </div>
</body>
</html>`
        
    },
    write_htmlfile(content){
        fs.writeFile('./html/log.html', content, function(err){
            if (err) throw err;
        });
    }
}
module.exports = util;

// var htmlContent = '<html>Whatever</html>';

// fs.writeFile('/my-page.html', htmlContent, (error) => { /* handle error */ });