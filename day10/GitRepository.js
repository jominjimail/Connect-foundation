
const GitRepository = class{
    constructor(){
        this.repos = [];

        this.catch = false;
        this.now_local = "";
    
        this.addlocal = (obj) =>{
            this.repos.push(obj);
        }

        this.showrepos = () =>{
            let pr = '';
            this.repos.forEach(function (element){
                pr+= (element.name+"/");
            })
            console.log(pr);
        }

        this.findrepos = (localname) =>{
            return this.repos.find(element => element.name === localname);
        }

        

    }
}

module.exports = GitRepository;