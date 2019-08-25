onmessage = function(e) {
    let bari_num = e.data[0];
    let menu_num = e.data[1];

    makeCoffe(menu_num);
    this.postMessage({result : "done", msg : mgs[menu_num], bari_num : bari_num});
}
const roastingTime = {
    1 : 1000,
    2 : 2000,
    3 : 3000
}

const mgs = {
    1 : '아메리카노 완료',
    2 : '카페라떼 완료',
    3 : '프라포치노 완료'
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    while(true){
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function makeCoffe(menu_num) {
    sleep(roastingTime[menu_num]);
}



