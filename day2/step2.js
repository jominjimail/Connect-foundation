// wow...gn18 stack-trace.
const stackTrace = require("stack-trace");
var calledFunctions = [];

function logFunctionName() {
    let trace = stackTrace.get();
    calledFunctions.push(trace[0].getFunctionName());
    calledFunctions.push(trace[1].getFunctionName());
}

function printExecutionSequence() {
    console.log(calledFunctions.join(" > "));
}

// functional programming : forEach
function value_check(arr){
    arr.forEach(function(item){
        if(typeof item !== "number"){
            throw new TypeError('Please input the integer');
        }
    });
}

// 1 function do 1 action : is that valid type?
function type_check(type){
    logFunctionName();

    const polygontypes = Object.keys(getAreaFuncMapping);
    if(!polygontypes.includes(type)){
        throw new TypeError('Wrong type.');
    }
}

// 1 function do 1 action : return answer value.
function getCircleArea(arr){
    logFunctionName();

    value_check(arr);
    return arr[0] * arr[0] * arr[1];
}
function getParallelogram(arr){
    logFunctionName();

    value_check(arr);
    return arr[0] * arr[1];
}
function getTrapezoid(arr){
    logFunctionName();

    value_check(arr);
    return (arr[0] + arr[1] ) * arr[2] / 2;
}

// wow...gn18
const getAreaFuncMapping = {
    circle: getCircleArea,
    parallelogram: getParallelogram,
    trapezoid: getTrapezoid,
};

// 1 function do 1 action : mapping function()
function getArea(type, ...args){
    logFunctionName();

    type_check(type);
    // wow... gn18
    let func = getAreaFuncMapping[type];

    return func(args);
}


function getAreaAvg(type, min, max, ...args){
    logFunctionName();

    let sum = 0;

    for(let i = min; i<=max ;i++){
        sum += getArea(type, i, 3.14);
    }
    return sum /(max-min+1);
}


console.log(getArea("circle", 10, 3.14));
console.log(getArea("parallelogram", 10, 15));
console.log(getArea("trapezoid", 10, 15, 12));
try{
    console.log(getArea("circle", 'eee', 3.14));
}catch(e){
    console.log(e.message);
}
console.log(getAreaAvg("circle", 5, 11));

printExecutionSequence();