//spec/source.test.js 안의 테스트코드가 동작될 수 있도록 lib/tester.js 코드를 개발한다.
//test, assert, equal, notEqual, detailEqual를 구현
//lib/tester.js를 완성한 후 source.test.js를 실행하면, 아래처럼 출력된다.
var assert2 = require('assert');
let Promise_check = 0;

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 4000);
    });
  }

const test = async(a, b) => {
    try{
        if(Promise_check == 1){
            await resolveAfter2Seconds();
        }
        console.log(a);
        let result = (b)();
        if( (typeof result) === "object"){ // instanceof Promise!!
            Promise_check = 1;
            result.then(() => {console.log("wait PASS")});
        }else{
            console.log("PASS");
        }  
    }catch(e){
         console.log('\x1b[31m%s\x1b[0m', 'FAIL');
    }
}

// const test = (a, b) => {
//     console.log(a);
//     try{
//         let result = (b)();
//         if( (typeof result) === "object"){
//             result.then(() => {console.log("wait PASS")});
//         }else{
//             console.log("PASS");
//         }
//     }catch(e){
//         console.log('\x1b[31m%s\x1b[0m', 'FAIL');
//     }
// }

const assert = {
    equal(actual, expected){
        if(actual !== expected) throw new Error('Whoops!');
        
    },
    notEqual(actual, expected){
        if(actual === expected) throw new Error('Whoops!');
    },
    detailEqual(actual, expected){     
        try{
            assert2.deepStrictEqual(actual, expected);

        }catch(e){
            throw new Error('Whoops!');
        }
    },
} 

module.exports = {test,assert};