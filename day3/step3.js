const fs = require("fs");

const read_json = () => {
    const filePath = "./json_tree.js";
    const file = fs.readFileSync(filePath);
    let json_data = JSON.parse(file);

    return json_data;
};

Array.prototype.customForEach = function(callback){
    for(var i = 0; i<this.length;i++){
        callback(this[i], i, this);
    }
};

Array.prototype.customReduce = function(callback, initValue){
    var acc = initValue;

    for(var i = 0; i<this.length;i++){      
        acc = callback( acc, this[i], i, this);
    }
    return acc;
}

Array.prototype.customFilter = function(callback){
    var arr = [];
    for(var i = 0; i<this.length;i++){
        if(callback(this[i], i, this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

Array.prototype.customMap = function(callback){
    var arr = [];
    for(var i = 0; i<this.length;i++){
        arr.push(callback(this[i],i, this));
    }
    return arr;
}

function getMatchedType(data, target){
	//console.log(this.toString());
    data.customForEach(function(v){
        if(v.type == target){
            objects.push(v.name);
		}
        if(v.childnode.length > 0){
            getMatchedType(v.childnode , target);
        }
    });
}

let json_data = read_json();
var objects = [];
let name = 'sk';
getMatchedType(json_data, name);

console.log(objects);

var answer = objects.customReduce(function(acc,name,idx){
    return idx == 0 ? name : acc + ', ' + name;
}, '')

console.log(`${name} 타입 데이터는 총 ${objects.length}개이며 ${answer} 입니다`)


var numbers = [5,12,10,40,90,4];
console.log(`default numbers :`,numbers);
var filteredNumbers = numbers.customFilter(function(n) {
    return n >= 10;
});
console.log(`after filtered with >=10 :`,filteredNumbers);

var mappedNumbers = numbers.customMap(function(n){
    return Math.pow(n,2);
});
console.log(`after mapped with ^2 :`,mappedNumbers);

