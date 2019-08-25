let where = "/";
let repo_arr = [];
let current_repo_num = -1;
let repos = require("./GitRepository.js");
let Local = require("./Local.js");
let Remote = require("./GitRemote.js");
var fs = require('fs');

const GitController = class{
    constructor(gitModel){
        this.gitModel = gitModel;
        this.repos = new repos();
        this.Remote = new Remote();

        this.runGit = () =>{
            const readline = require('readline');
            const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
            });
        
            rl.setPrompt(`${where} > `);
            rl.prompt();
        
            rl.on('line', (line)=> {
                const [command, ...options] = line.split(' ');
                if(command == 'q'){
                    rl.close();
                }
                switch(command){
                    case "init":
                        let local = new Local(options[0]);
                        this.repos.addlocal(local);

                        console.log(`create ${options[0]} repository.`);
                        break;
                    case "checkout":
                        if(!this.repos.catch){
                            var classout = this.repos.findrepos(options[0]);
                            if(classout !== undefined){
                                where+=classout.name;
                                rl.setPrompt(`${where} > `);
                                this.repos.catch = true;
                                this.repos.now_local = classout.name;
                                console.log(this.repos)
                            }
                        }else{
                            this.repos.catch = false;
                            this.repos.now_local = "";
                            where = "/";
                            rl.setPrompt(`${where} > `);
                            console.log(this.repos)
                        }
                        break;
                    case "new":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.makeFile(options, obj);
                        }else{
                            console.log("You can't create new file.");
                        }
                        break;
                    case "status":
                        if(options[0] === "remote" && this.repos.catch === true){
                            let obj = this.Remote.findrepos(options[1]);
                            let log_len = obj.log.length;
                            console.log("last " ,obj.log[log_len-1]);

                        }
                        else if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.showStatus(obj);
                        }else{
                            this.repos.showrepos();
                        }               
                        break;
                    case "add":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.moveStage(options,obj);
                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    case "commit":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.moveRepo(options,obj);
                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    case "touch":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.editFile(options,obj);
                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    case "log":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            this.gitModel.printlog(obj);
                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    case "push":
                        if(this.repos.catch){ //잡았다면,
                            let obj = this.repos.findrepos(this.repos.now_local);
                            let new_files = this.gitModel.filterFile(obj);
                            let remote_local = new Local(this.repos.now_local);
                            remote_local.files = new_files;
                            remote_local.log = obj.log;
                            console.log("push some commits...");
                            remote_local.log.forEach(function(element){
                                console.log(element + "pushed");
                            })

                            this.Remote.addlocal(remote_local);

                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    case "remote":
                        if(this.repos.catch && this.Remote.repos.length !== 0){ //잡았다면,
                            let content = JSON.stringify([this.Remote.repos],null,4);
                            console.log(content);

                            fs.writeFile('./remote.json', content, function(err){
                                if (err) throw err;
                            });
                        }else{
                            console.log("WRONG ACCESS");
                        }
                        break;
                    default:
                        console.log("error~~");

                }
                rl.prompt();
            } 
            )
            .on('close', function () {
            process.exit();
            });
        };
    }
}
module.exports = GitController