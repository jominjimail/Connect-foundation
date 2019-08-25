//수정 불가
//src/source.test.js에 , appendLazy 함수에 대한 테스트 코드를 추가로 구현한다.
//이미 사용중인 lib/tester.js의 test 함수를 사용해서 구현한다.
//given/when/then의 순서를 따라서 구현한다.
const {nand, nor, xor, dec2bin, bin2dec} = require("../friend_code.js");

const {sum, isEven, appendLazy } = require("../src/source.js")
const _ = require("lodash");
const {test, assert }  = require("../lib/tester.js");


test('support notEqual', () => {
    assert.notEqual(undefined, null); //pass
});

test('adds 1 + 2 to equal 3', () => {
    assert.equal(sum(1,2), 3) //pass
});

test('should support flattening of nested arrays', function() {
    const arr = [1, [2, [3, [4]], 5]];
	assert.detailEqual(_.flatten(arr), [1, 2, [3, [4]], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,2), [1, 2, 3, [4], 5]); //pass
    assert.detailEqual(_.flattenDepth(arr,3), [1, 2, 3, [4], 5]);  //fail
});

test('should support filtering of arrays', function() {
    const arr = [1,2,3,4,5,6];
    assert.detailEqual(_.filter(arr, isEven), [2,4,5,6]); //fail
});




test('async test',async function(){
    const arr = [10,20];
    let result = await appendLazy(arr, 30, 3000); // 권한이 바뀜.
    assert.detailEqual(result, [10,20,30]);
    //result.then(assert.detailEqual(result, [10,20,30]));
});

test('should support filtering of arrays 2', function() {
    const arr = [1,2,3,4,5,6];
    assert.detailEqual(_.filter(arr, isEven), [2,4,6]); //pass
});

//추가 예정
const bool_x = [false, false, true, true];
const bool_y = [false, true, false, true];

test('friend_code function 1 nand', function(){
    const result = [true, true, true, false];

    for(let i = 0;i<4;i++){
        assert.equal(nand(bool_x[i], bool_y[i]),result[i]);
    }
});

test('friend_code function 2 nor', function(){
    const result = [true, false, false, false];

    for(let i = 0;i<4;i++){
        assert.equal(nor(bool_x[i], bool_y[i]),result[i]);
    }
});

test('friend_code function 3 xor', function(){
    const result = [false, true, true, false];

    for(let i = 0;i<4;i++){
        assert.equal(xor(bool_x[i], bool_y[i]),result[i]);
    }
});

test('friend_code function 4 dec2bin', function(){
    const result = [false, true, true, false];

    assert.detailEqual(dec2bin(10),[ 0, 1, 0, 1 ]);
});

test('friend_code function 5 bin2dec', function(){
    const result = [false, true, true, false];
    assert.equal(bin2dec([ 0, 1, 0, 1 ]),10);

});

