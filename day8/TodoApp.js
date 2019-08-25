
const TodoModel = require("./TodoModel.js")
const TodoController = require("./TodoController.js")
const TodoHtmlView = require('./TodoHtmlView.js') //뒤에 설명

const axios = require("axios");


(async () => {
    try{
        const response = await axios.get('http://localhost:8090/');
        const todolist = response.data;

        const todoModel = new TodoModel(todolist);
        const controller = new TodoController(todoModel);
        controller.runTodo(controller.data);
        new TodoHtmlView(todoModel);

    }catch(e){
        console.log(e);
    }
})();



// const fs = require("fs");
// const initDataJSON = fs.readFileSync("./data.json", "utf8");
// const initData = JSON.parse(initDataJSON);

//todolist 값을 서버에서 얻어와야 한다.
//const todolist = 서버에서 데이터 가져오기 코드가 필요



