const TodoController = class{
    constructor(todoModel){
        this.todoModel = todoModel;
        
        this.runTodo = () =>{
            const readline = require('readline');
            const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });
        
            rl.setPrompt("명령하세요. : ");
            rl.prompt();
        
            rl.on('line', (line)=> {
                const [command, ...options] = line.split('$$');
                if(command == 'q'){
                    rl.close();
                }
                switch(command){
                    case "show":
                        this.todoModel.show(options);
                        break;
                    case "add":
                        this.todoModel.add(options);
                        break;
                    case "update":
                        this.todoModel.update(options);
                        break;
                    case "delete":
                        this.todoModel.delete(options);
                        break;
                    default:
                        console.log("error~~");
                }

            })
            .on('close', function () {
            process.exit();
            });
        };
    }
}
module.exports = TodoController