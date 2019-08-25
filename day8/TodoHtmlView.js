//todoModel에서 현재상태를 출력 할 때마다, log.html파일을 새롭게 생성하는 파일이다. 

function TodoHtmlView(todoModel){
    this.todoModel = todoModel;
    
}
TodoHtmlView.prototype = {
    content_htmlfile(current_string){
        return  `<!DOCTYPE html>
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
};



module.exports = TodoHtmlView;