let menuQueue = [];
let bariQueue = [];

var events = require('events');
var chashier = new events.EventEmitter();
var barista = new events.EventEmitter();
var dashboard = new events.EventEmitter();
const start_msg = {
    1:'아메리카노 시작',
    2:'카페라떼 시작',
    3:'프라프치노 시작'
}
const fin_msg = {
    1:'아메리카노 완료',
    2:'카페라떼 완료',
    3:'프라프치노 완료'
}
const roastingTime = {
    1:3000,
    2:5000,
    3:10000
}
dashboard.on('show',function(){
    console.log(menuQueue);
})
chashier.on('receive_order', function(mene_id){
    menuQueue.push(mene_id);
});

chashier.once('fin_order',function(msg){
    console.log(msg);
})

barista.on('makeCoffe', function(menu_id, index){
    bariQueue[index].state = true;
    var now = new Date();
    now = now.getHours() + "시" + now.getMinutes() + "분" + now.getSeconds() + "초";
                
    console.log(now , fin_msg[menu_id]);
})

barista.on('startCoffe', function(menu_id,index){
    bariQueue[index].state = false;
    console.log(start_msg[menu_id]);
})

function doWork(){
    let index = check_bari();
    if(menuQueue.length >0 && index >= 0){
        dashboard.emit('show');
        let menu_num = menuQueue.shift();
        barista.emit('startCoffe',menu_num,index);
        setTimeout(() => barista.emit('makeCoffe', menu_num, index), roastingTime[menu_num]);
    }
    if(break_bari() && menuQueue.length === 0){
        chashier.emit('fin_order','모든 메뉴가 다 만들어졌습니다.');
        return;
    }
    setTimeout(() => {doWork()}, 0);
}


function break_bari(){
    for(let i=0;i<bariQueue.length;i++){
        if(bariQueue[i].state === false) {
            return false;
        }
    }
    return true;
}

function check_bari(){
    let flag = false;
    let pos = -1;
    for(let i=0;i<bariQueue.length;i++){
        if(bariQueue[i].state === true) {
            flag = true;
            pos = i;
            break;
        }
    }
    return pos;
}

function makeBariQueue(num){
    for(let i=0;i<num;i++){
        for(let j=0;j<2;j++){
            bariQueue.push({id : i,events : barista, state: true});
        }
    }
}

let input = () =>{
    const readline = require('readline');
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line', (line)=> {
        const [menu_id, num] = line.split(':');
        if(menu_id == 'q'){
            rl.close();
        }
        for(let i=0;i<num;i++){
            chashier.emit('receive_order',menu_id);
        }
        console.log(menuQueue);
        doWork();
        rl.prompt();
    } 
    
    )
    .on('close', function () {
    process.exit();
    });
};


makeBariQueue(1);
console.log(bariQueue);

input();