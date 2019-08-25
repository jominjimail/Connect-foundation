uniqueNumber.previous = 1000;

function uniqueNumber() {
    uniqueNumber.previous = uniqueNumber.previous + 1;
    return uniqueNumber.previous;
}

const fs = require("fs");
const get_json_data = () => {
    const filePath = "./json-data.js";
    const file = fs.readFileSync(filePath);
    let json_data = JSON.parse(file);
    return json_data;
};

let json_data = get_json_data();


let states = [];
json_data.forEach(element =>{
    states.push(Object.keys(element)[0]);
});

function show_all(){
    json_data.forEach(function(element, index){
        let id_arr =  element[states[index]].reduce(function(acc, currentValue){
            acc.push(currentValue.id);
            return acc;
        },[]);
    
        if(typeof id_arr[0] == 'undefined'){
            id_arr = [];
        }
        console.log(states[index], ": ", id_arr);
    });
}

function show_detail(state){
    let ans = []
    json_data.forEach(function(element){
        if(Object.keys(element)[0] == state){
            ans.push(element[state].length);
            let str_des = [];
            for (item of element[state]) {
                str_des.push(item.des + item.id + "번");
            }
            ans.push(str_des.join());
        }
    })
    return ans;
}

function input(order_arr){
    const readline = require('readline');
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    rl.setPrompt("명령하세요. : ");
    rl.prompt();

    rl.on('line', function (line) {
        order_arr = line.split('$$');
        if(order_arr[0] == 'q'){
            rl.close();
        }
        orderAnalyzer(order_arr);
    })
    .on('close', function () {
    process.exit();
    });
}

function make_object(order_arr){
    let des = order_arr[0];
    let values = order_arr[1].split("\"");
    let unique_id = uniqueNumber();

    let arr_values = values.reduce(function(acc, currentValue, index){
        if(index%2 == 1){
            acc.push(currentValue);
        }
        return acc;
    }, []);

    let object = {};
    object.id = unique_id;
    object.values = arr_values;
    object.des = des;
    return object;
}

// return [ finded_state , finded_object ] || ["not_find"]
function find_Current_info (target_id){
    let ans = [];
    let flag = false;
    for(var i=0;i<states.length;i++){
        for(var len = 0;len <json_data[i][states[i]].length;len++){
            if(json_data[i][states[i]][len].id == target_id){
                flag = true;
                ans.push(states[i]);
                ans.push(json_data[i][states[i]][len]);
            }
        }
    }
    if(flag == false){
        ans.push("not_find");
    }
    return ans;
}

function states2index(state){
    for(var i =0;i<states.length;i++){
        if(state == states[i]) return i;
    }
}

function delete_arr(info,target_id){
    let index = states2index(info[0]);
    let new_arr = json_data[index][info[0]].filter(item => {
        return item.id != target_id;
    })
    json_data[index][info[0]] = new_arr;
}

function orderAnalyzer(order_arr){
    let main_order = order_arr.shift();

    if(main_order == "show"){
        if(order_arr[0] == "current"){
            show_all();
        }else{
            let res_detail = show_detail(order_arr);
            console.log(`todo리스트 :  총${res_detail[0]}건 : ${res_detail[1]}`);
        }

    }else if(main_order == "add"){
        let object_forAdd = make_object(order_arr);
        console.log(`${object_forAdd.des}가 추가됐습니다.(id : ${object_forAdd.id})`);
        json_data[0].todo.push(object_forAdd);
        show_all();

    }else if(main_order == "update"){
        let id = order_arr[0];
        let inputed_state = order_arr[1];
        
        //info :  [ finded_state , finded_object ] || ["not_find"]
        let info = find_Current_info(id);

        if(info[0] == 'not_find'){
            console.log(`I cann't find id :${id} input the existed id.`);
        }else{
            let object_forUpdate = info[1];

            if(info[0] == inputed_state){
                console.log(`id : ${id} is already in ${inputed_state}`);
            }else{
                delete_arr(info,id);

                setTimeout(function() {
                    console.log(`${object_forUpdate.des} 가 ${inputed_state}으로 상태가 변경됐습니다`);
                    let index = states2index(inputed_state);
                    json_data[index][inputed_state].push(object_forUpdate);
                    show_all();
                }, 2000);
            }
        }

    }else if(main_order == "delete"){
        let id = order_arr[0];
        let info = find_Current_info(id);

        if(info[0] == 'not_find'){
            console.log(`I cann't find id :${id} input the existed id.`);
        }else{
            delete_arr(info,id);
            console.log(`${info[1].des} 가 ${info[0]} 목록에서 삭제됐습니다`);
            show_all();
        }
    }
}

let order_arr = [];
input(order_arr);

