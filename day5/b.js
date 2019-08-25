/*
각 함수시작마다 break point를 걸었다.
watch에 함수의 파라미터값들을 추가해 확인했다.
typeError : undefined 일 경우가 많다. function이 아니다.
syntaxError : 문법적인 오류이다. 
Dubugger console panel 에서 toString.call(result); 를 해본다.
ReferenceError : 찾아봤는데 없더라~~
*/

const {Checker} = require("./a.js");
const assert = require("assert");
const msg = require("./c.js");
const data = require("./d.js");


const checker = new Checker(msg);

function* run(source, targets) {
    const rightMsg = msg.ok.msg;
    const checkMember = checker.bindMembers(targets);
    result = yield checkMember(source);

    result.then((value)=>{
        assert.equal(value, rightMsg);
        console.log("error없이 프로그래밍이 실행됐습니다");
    }).catch((e)=>console.log(`이크 에러가 발생했어요. ${e.message}`));
}

a.runner(run, data.ourStudents, ['crong', 'jk']);
a.runner(run, data.ourProfessors, ['Bill', 'Ritchie']);

/* 실행결과 
error없이 프로그래밍이 실행됐습니다
이크 에러가 발생했어요 'who are you?' == 'hello our members!'
*/

