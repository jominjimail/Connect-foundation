var events = require('events');

var chashier = new events.EventEmitter();
var pattern_eng = /[a-zA-Z]/;

chashier.on('receive_order2', function(menu_id,custom_id){
    let str = custom_id+menu_id;
    s_menuQueue.push({custom_id : custom_id, menu_id:menu_id, str : str});
});

chashier.on('receive_order', function(menu_id){
    menuQueue.push(menu_id);
});

let menuQueue = [];
let s_menuQueue = [];
let s_customer = [];

function Chashier(manager){
    this.manager = manager;
}

Chashier.prototype = {
    input(){
        const readline = require('readline');
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });
    
        rl.setPrompt('>');
        rl.prompt();
    
        rl.on('line', (line)=> {
            const [cmd, ...num] = line.split(' ');
            if(cmd == 'q'){
                rl.close();
            }
            else if(cmd == 'set'){
                console.log(`바리스타는 총 ${num}명입니다.`);
                this.manager.makeBariQueue(num);
            }else if(pattern_eng.test(cmd)){
                //손님 구별 주문
                let total = 0;
                let msg = `===== ${cmd}`;

                for(let i=0;i<num.length;i++){
                    let [menu_id,_num] = num[i].split(':');
                    msg += coffe_name[menu_id];
                    for(let j=0;j<_num;j++){
                        total++;
                        chashier.emit('receive_order2',menu_id,cmd);
                    }
                }
                s_customer.push({custom_id:cmd, total:total, msg:msg, state:false});
                this.manager.doWork2(s_menuQueue,s_customer);
           
            }
            else{
                // 그냥 주문 
                console.log(line);
                const [menu_id, num] = line.split(':');
                for(let i=0;i<num;i++){
                    chashier.emit('receive_order',menu_id);
                }
                this.manager.doWork(menuQueue);
            }   
            //console.log(menuQueue);
            rl.prompt();
        } 
        
        )
        .on('close', function () {
        process.exit();
        });
    }
}

const coffe_name = {
    1:' 아메리카노',
    2:' 카페라떼',
    3:' 프라프치노'
}

module.exports = Chashier;




