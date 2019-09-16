

//https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
function sleep(milliseconds) {
    var start = new Date().getTime();
    while(true){
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}
  
function runSync(id) {
    sleep(2000);
    console.log(id+ " sync 함수 실행");
    if(id === 4){
        console.timeEnd('id_4');
    }
}

//runAsync 함수는 수정하지 않는다.
function runAsync(id) {
    console.log(id + " async 함수 실행");
}

//executeEventQueue는 callstack이 비워지면, eventQueue에 있는 함수가 순서대로 실행되도록 구현한다.
//executeEventQueue는 종료되지 않고 계속 실행되는 프로그램이다.
function executeEventQueue(callstack, eventQueue) {
    if(stack_isEmpty(callstack)&&!stack_isEmpty(eventQueue)){
        let item_Queue = eventQueue.shift();
        stack_push(callstack, item_Queue);
    }
    setTimeout(() => executeEventQueue(callstack, eventQueue), 0);
}


function stack_isEmpty(data){
    //if (Object.keys(data).length !== 0) return false;
    if (data.length !== 0) return false;
    else return true;
}
function stack_pop(data){
    let pop_item = data.pop();
    pop_item();
}
function stack_show(data){
    console.log(data);
}
function stack_push(data, item){
    data.push(item);
}

//executeCallStack은 callstack에 있는 함수가 역순으로 실행되도록 구현한다.
//executeCallStack은 종료되지 않고 계속 실행되는 프로그램이다.
//하지만 callstack에 더이상 실행해야할 함수가 없다면 종료되야 한다.
function executeCallStack(callstack,time) {
    if(time === undefined){ time = new Date().getTime();}

    //stack_show(callstack);
    while(!stack_isEmpty(callstack)){
        stack_pop(callstack);
        time = new Date().getTime();
    }

    if((new Date().getTime() - time) > 5000){
        process.exit();
    }

    setTimeout(() => { executeCallStack(callstack,time)}, 0);
}

//이부분은 수정하지 않는다. 
//callStack과 eventQueue의 갯수는 1개 이상 n개일 수 있다.
let callStack = [runSync.bind(null, 1), runSync.bind(null, 2)];
let eventQueue = [runAsync.bind(null, 1),runAsync.bind(null, 2),runAsync.bind(null, 3)];


console.time('id_4');
//프로그래밍 실행 예시
//구현방법에 따라서, executeEventQueue,executeCallStack 실행시 필요한 인자는 아래와 다를 수 있다.
executeEventQueue(callStack, eventQueue);
executeCallStack(callStack, eventQueue);
callStack.push(runSync.bind(null, 3));
setTimeout(()=>callStack.push(runSync.bind(null, 4)), 6000);
setTimeout(()=>callStack.push(runSync.bind(null, 5)), 20000);
