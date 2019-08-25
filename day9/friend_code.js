var nand = function(a,b){return (a&&b) ? false:true;}
var nor = (a,b)=>{return nand(nand(nand(a,a),nand(b,b)),nand(nand(a,a),nand(b,b)))}
var xor = (a,b)=> {return nand(nand(!a,b), nand(a,!b));}
var halfadder = (a,b) => {return [a && b , xor(a,b)]}
var fulladder = (bitA,bitB,carry) => {return [ (bitA && bitB) || ((bitA || bitB) && carry) , xor(xor(bitA,bitB),carry) ]}
var biteadder = function(byteA, byteB){
    let zip = arr=>arr[0].map((_,rest)=>arr.map(row=>row[rest]));
    return zip([byteA,byteB]).reduce((acc,val)=>{
        acc.push(...fulladder(...val, acc.pop()).reverse())
        return acc.map(a=>a+0);
    },[0]);
}

var dec2bin = function(dec){return [...dec.toString(2)].map(Number).reverse();}

var bin2dec = function(bin){return bin.reduce((acc,val,idx)=>{acc += val * (2 ** idx) ; return acc;}, 0) }

console.log(dec2bin(10));
console.log(bin2dec([ 0, 1, 0, 1 ]));

module.exports = {nand, nor, xor, dec2bin, bin2dec};