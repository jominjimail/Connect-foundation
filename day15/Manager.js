var events = require('events');
var fs = require('fs');

var barista = new events.EventEmitter();
var manager = new events.EventEmitter();
var dashboard = new events.EventEmitter();

barista.on('startCoffe', function(menu_id,index,bariQueue){
    bariQueue[index].state = false;
    console.log(start_msg[menu_id]);
})

// A 1:10 2:4 
// B 1:2 2:1 3:2
// C 1:3

barista.on('startCoffe2', function(obj,index,bariQueue){
    bariQueue[index].state = false;
    console.log(`바리스타 ${bariQueue[index].id} - `,obj.custom_id,start_msg[obj.menu_id]);
})

barista.on('makeCoffe', function(menu_id, index,bariQueue){
    bariQueue[index].state = true;
    var now = new Date();
    now = now.getHours() + "시" + now.getMinutes() + "분" + now.getSeconds() + "초";  
    console.log(now , fin_msg[menu_id]);
})

barista.on('makeCoffe2', function(obj, index,bariQueue){
    bariQueue[index].state = true;
    var now = new Date();
    now = now.getHours() + "시" + now.getMinutes() + "분" + now.getSeconds() + "초";  
    console.log(now , obj.custom_id,fin_msg[obj.menu_id]);
})

dashboard.on('show',function(menuQueue){
    console.log(menuQueue);
})

dashboard.on('show2',function(s_menuQueue){
    let s = s_menuQueue.map(item => item.str);
    console.log(s);
})

dashboard.on('save_JSON',function(s_menuQueue){
    let content = JSON.stringify(s_menuQueue,null,2);
    fs.writeFile('./DashBoard.json', content, function(err){
        if (err) throw err;
    });
})

manager.once('fin_order',function(msg){
    console.log(msg);
})

manager.on('discount_total',function (obj,s_customer){
    for(let i=0;i<s_customer.length;i++){
        if(s_customer[i].custom_id === obj.custom_id){
            s_customer[i].total--;
            break;
        }
    }
})



function Manager(){
    this.bariQueue = [];
}

Manager.prototype = {
    makeBariQueue(num){
        for(let i=0;i<num;i++){
            for(let j=0;j<2;j++){
                this.bariQueue.push({id : i,events : barista, state: true});
            }
        }
    },
    doWork(menuQueue){
        let now = new Date().getTime();
        _doWork(menuQueue,this.bariQueue,now);
    },
    doWork2(s_menuQueue,s_customer){
        let now = new Date().getTime();
        make_customer_msg(s_customer);
        _doWork2(s_menuQueue,s_customer,this.bariQueue,now);
    }
}

function _doWork2(s_menuQueue,s_customer,bariQueue,time){
    let now = new Date().getTime();

    if( (now - time) >= 1000){
        dashboard.emit('show2',s_menuQueue);
        dashboard.emit('save_JSON',s_menuQueue);
        time = now;
    }
    let index = check_bari(bariQueue);

    if(s_menuQueue.length >0 && index >= 0){
        let obj = s_menuQueue.shift();

        barista.emit('startCoffe2',obj,index,bariQueue);
        setTimeout(() => {
            barista.emit('makeCoffe2', obj, index,bariQueue);
            manager.emit('discount_total',obj,s_customer);
        }, roastingTime[obj.menu_id]);
    }

    for(let j=0;j<s_customer.length;j++){
        if(s_customer[j].total === 0){
            manager.emit(`${s_customer[j].custom_id}`,s_customer[j].msg);
            s_customer[j].total = -1;
        }
    }

    if(break_bari(bariQueue) && s_menuQueue.length === 0){
        manager.emit('fin_order','모든 메뉴가 다 만들어졌습니다.');
        return;
    }

    setTimeout(() => {_doWork2(s_menuQueue,s_customer,bariQueue,time)}, 0);
}

function make_customer_msg(s_customer){

    for(let i=0;i<s_customer.length;i++){
        
        if(s_customer[i].state === false){
            s_customer[i].state = true;
            manager.once(`${s_customer[i].custom_id}`,function(msg){
                console.log(msg);
            })
        }
    }
}

function _doWork(menuQueue,bariQueue,time){
    let now = new Date().getTime();

    if( (now - time) >= 1000){
        dashboard.emit('show',menuQueue);
        time = now;
    }

    let index = check_bari(bariQueue);

    if(menuQueue.length >0 && index >= 0){
        
        let menu_num = menuQueue.shift();
        barista.emit('startCoffe',menu_num,index,bariQueue);
        setTimeout(() => barista.emit('makeCoffe', menu_num, index,bariQueue), roastingTime[menu_num]);
    }

    if(break_bari(bariQueue) && menuQueue.length === 0){
        manager.emit('fin_order','모든 메뉴가 다 만들어졌습니다.');
        return;
    }
    setTimeout(() => {_doWork(menuQueue,bariQueue,time)}, 0);
}

function check_bari(bariQueue){
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

function break_bari(bariQueue){
    for(let i=0;i<bariQueue.length;i++){
        if(bariQueue[i].state === false) {
            return false;
        }
    }
    return true;
}

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

module.exports = Manager;