onmessage = function(e) {

    for(let i=0;i<e.data[0];i++){
        let barista = new Worker('./barista.js');

        barista.onmessage = function(e){
            if(e.data.result === 'done') {
                // bari_num 으로 찾아서 true 로 다시 바꿔주기.
                readyQueue[e.data.bari_num].state = true;
                var now = new Date();
                now = now.getHours() + "시" + now.getMinutes() + "분" + now.getSeconds() + "초";
                console.log(now , e.data.bari_num+' 번 바리스타 '+e.data.msg);
            }
        }

        readyQueue.push( {num : i, worker : barista, state: true});
    }

    menu = make_menuArray(e.data[1],e.data[2],e.data[3]);
    doWork(menu);
}

function doWork(menu){

    let index = check_Queue(menu);
    
    if(index >= 0 && menu.length >0){
        let menu_num = menu.shift();
        readyQueue[index].state = false;
        readyQueue[index].worker.postMessage([index, menu_num]);
    }

    if(menu.length == 0 && break_Queue()){
        readyQueue.map((item) => {
            item.worker.terminate();
        })
        this.postMessage({result : '모든 메뉴가 다 만들어졌습니다'});
        return;
    }
    setTimeout(() => {doWork(menu)}, 0);
}


let menu;

function break_Queue(){
    for(let i=0;i<readyQueue.length;i++){
        if(readyQueue[i].state === false) {
            return false;
        }
    }
    return true;
}

function check_Queue(){
    let flag = false;
    let pos = -1;
    for(let i=0;i<readyQueue.length;i++){
        if(readyQueue[i].state === true) {
            flag = true;
            pos = i;
            break;
        }
    }
    return pos;
}

function make_menuArray(coffe1,coffe2, coffe3){
    let ans = [];
    for(let one = 0;one <coffe1;one++){
        ans.push(1);
    }
    for(let one = 0;one <coffe2;one++){
        ans.push(2);
    }
    for(let one = 0;one <coffe3;one++){
        ans.push(3);
    }
    return ans;
}
const roastingTime = {
    coffe1 : 1000,
    coffe2 : 2000,
    coffe3 : 3000
}


function isEmpty(arr){
    if(arr.length !== 0) return false;
    else return true;
}

let readyQueue = [];


