const util = require('./util.js');
const observer = require('./Observable.js');
function TodoModel(data){
    this.data = data;
}

TodoModel.prototype = 



//출처 : https://github.com/connect-foundation/day6-challenge/blob/gn05/todos.js
TodoModel.prototype = {
    show(options){
        let printData = ``;
        if(options[0] === "current"){
            printData = getCurrent(this.data);
            console.log(printData);

            // let current_str = util.content_htmlfile(printData);
            // util.write_htmlfile(current_str);

        }else{
            printData = getXList(this.data,options[0]);
            console.log(printData);
        }
    },
    add([options_des, options_tags]) {
        let printData = ``;
        const parsedTags = JSON.parse(options_tags);
        const id = util.make_uniqueId();
        // this.data.push(newData);  //not immutable
        //...this.data == spread Attribute WOW~
        const newData = [
            ...this.data, 
            { id: id, des: parsedTags,  status: "todo" ,value: parsedTags}
        ];
        this.data = newData;

        printData += `${options_des}가 추가됐습니다. (id : ${id})\n`;
        printData += getCurrent(this.data);
        console.log(printData);
        
        //util.update_jsonfile(this.data);
    },
    async update([id,next_status]){
        let printData = ``;
        //find is returns the value of the first element
        const target = this.data.find(todo => todo.id === id);

        if(target) {
            target.status = next_status;
            printData += `${target.des}의 상태가 ${target.status}로 변경됐습니다.\n`;
            printData += getCurrent(this.data);

            await util.delay(2000);
            console.log(printData);
            //util.update_jsonfile(this.data);
        }else{
            console.log('해당 id를 가진 데이터가 존재하지 않습니다.');
        }
    },
    delete([id]){
        let printData = ``;
        const target_index = this.data.findIndex(todo => todo.id === id);
        const element = this.data[target_index];
        if(element) {
            this.data.splice(target_index, 1);
            printData += `${element.des}가 ${element.status}리스트에서 삭제됐습니다.\n`
            printData += util.getCurrent(this.data);
            console.log(printData);
            //util.update_jsonfile(this.data)
        } else {
            console.log('해당 id를 가진 데이터가 존재하지 않습니다.');
        }
    }
};


function getCurrent(data){
    return `현재상태 : ${getXId(data,'todo')}, ${getXId(data,'doing')}, ${getXId(data,'done')}`;
};

function getXList(data,x, des = 'des'){
    const  xList = data.filter(e => e.status === x)
    return xList.reduce((prev, next, i) => {
        return prev + `${i === 1 ? `,` : ``} '${next[des]}, ${next.id}번'`;
    }, `${x}리스트 :  총${xList.length}건 : `)
};

function getXId(data, x){
    return `${x}:[${data.filter(e => e.status === x).map(e => e.id)}]`;
};


module.exports = TodoModel;