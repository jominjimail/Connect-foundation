function * foo(x) {
    while (true) {
        x = x * 2;
        yield x;
    }
}

var g = foo(2);
console.log(g.next());
console.log(g.next());
console.log(g.next());


function* process() {
    console.log('Start process 1');
    console.log('Pause process2 until call next()');

    yield;

    console.log('Resumed process2');
    console.log('Pause process3 until call next()');

    let parms = yield {age: 12};
    console.log("Passed by final process next(90): " + parms);

    console.log('Resumed process3');
    console.log('End of the process function');
}

let _process = process();
let out1 = _process.next();
console.log(out1);
let out2 = _process.next();
console.log(out2);
let out3 = _process.next(90);
console.log(out3);
