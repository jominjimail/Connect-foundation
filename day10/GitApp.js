const GitController = require("./GitController.js")
const GitModel = require("./GitModel.js")
const axios = require("axios");


(async () => {
    try{
        const response = await axios.get('http://localhost:8090/');
        const remotedata = response.data;

        const gitModel = new GitModel(remotedata);
        const controller = new GitController(gitModel);
        controller.runGit();

    }catch(e){
        console.log(e);
    }
})();


