// mod()
function custom_mod(x,y){
    let r = x;
    while(r>=y){
        r -= y;
    }
    return r;
}

// pow()
function custom_pow(x,y){
    if(y == 0) return 1;
    else if(( custom_mod(y,2)) == 0){
        return custom_pow(x,parseInt(y/2)) * custom_pow(x, parseInt(y/2));
    }else{
        return x * custom_pow(x,parseInt(y/2)) * custom_pow(x, parseInt(y/2));
    }
}

//bin2dec
function bin2dec(arr){
    return arr.reduce(function(accumulator, currentValue, currentIndex){
        return accumulator += currentValue * custom_pow(2,currentIndex);
    },0);
}

//dec2bin
function dec2bin(n){
    const arr = [];
    while(n){
        arr.push(custom_mod(n,2));
        n = parseInt(n/2);
    }
    return arr;
}

//NAND, NOR, XOR
function nand(x,y){
    //return +(!(x&y));
    return !(x&y);
}

function nor(x,y){
    //return +(!(x|y));
    return !(x|y);
}

function xor(x,y){
    const c = nand(x,y);
    return nand(nand(x,c) , nand(y,c));
}

//Haf-adder
function halfadder(x,y){
    const arr = [];
    const sum = xor(x,y);
    const carry = !!(x&y);
    arr.push(sum);
    arr.push(carry);
    return arr;
}

//Full-adder
function fulladder(x,y,carry_in){
    const arr = [];
    let sum, carry;

    const half_result1 = halfadder(x,y);
    const half_result2 = halfadder(carry_in, half_result1[0]);
    sum = half_result2[0];
    carry = !!(half_result2[1] | half_result1[1]);

    arr.push(sum);
    arr.push(carry);

    return arr;
}

//8-byte-adder
function byteadder(arr_x, arr_y){
    const answer = [];
    
    let arr = [];
    let carry_in = 0;
    const max_len = (arr_x <= arr_y) ? arr_y.length : arr_x.length;
    
    fitted_x = make_byte(arr_x, max_len);
    fitted_y = make_byte(arr_y, max_len);

    for(var i =0;i<=max_len+10;i++){
        console.log(fitted_x[i]);
        arr = fulladder(fitted_x[i], fitted_y[i], carry_in);
        answer.push(+arr[0]);
        carry_in = arr[1];
    }

    if(carry_in & 1) answer.push(+carry_in);

    return answer;
}

//make byte
function make_byte(arr,max_len){
    if(arr.length != max_len){
        let count = max_len-arr.length;
        let copy_arr = arr;
        while(count--){
            copy_arr.push(0);
        }
        return copy_arr;
    }else{
        return arr;
    }
}

function gate_check(arr_x, arr_y, carry_in, n){
    console.log("nand :");
    for(var i =0;i<n;i++){
        console.log(nand(arr_x[i], arr_y[i]));
    }

    console.log("nor :");
    for(var i =0;i<n;i++){
        console.log(nor(arr_x[i], arr_y[i]));
    }

    console.log("xor :");
    for(var i =0;i<n;i++){
        console.log(xor(arr_x[i], arr_y[i]));
    }

    console.log("half adder : [ sum , carry ]")
    for(var i =0;i<n;i++){
        console.log(halfadder(arr_x[i], arr_y[i]));
    }

    console.log("full adder : [ sum , carry ]");
    for(var i=0;i<n;i++){
        for(var c=0;c<2;c++){
            console.log(fulladder(arr_x[i], arr_y[i], carry_in[c]));
        }
    }
}

const byteA = [ 1, 1, 0, 1, 1, 0, 1, 0 ];
const byteB = [ 1, 0, 1, 1, 0, 0, 1, 1 ];
const num_not_byte = 13;

console.log('byteA :',byteA);
console.log('byteB :',byteB);
console.log('num   :',num_not_byte);
console.log();

console.log(`after bin2dec :`,bin2dec(byteA));
console.log(`after bin2dec :`,bin2dec(byteB));
console.log('after dec2bin :',dec2bin(num_not_byte) );
console.log('after make_byte : ',make_byte(dec2bin(num_not_byte)));
console.log();

let ans = byteadder(dec2bin(num_not_byte), dec2bin(num_not_byte));
console.log('sum of 8-bit :', ans);
console.log(bin2dec(ans));


const bool_x = [false, false, true, true, -1];
const bool_y = [false, true, false, true, -1];
const carry_in = [false,true];

gate_check(bool_x, bool_y, carry_in, 5);

console.log( !(-1 & -1));
console.log( !(-1 | -1));

