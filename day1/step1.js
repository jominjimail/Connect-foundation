// 1 function do 1 action.
function _gcd(x,y){
  if(x < y){
    [x,y] = [y,x];
  }

  if(y == 0){
      return x;
  }else{
      return _gcd(y,x%y);
  }
}
// 1 function do 1 action.
function gcd(arr){
  if(arr.length != 2){
    throw new TypeError('arr length expect 2');
  }
  const x = arr[0];
  const y = arr[1];
  if( typeof x !== 'number' || typeof y !== 'number'){
    throw new TypeError('arr expect number');
  }

  return _gcd(x,y);
}

function divisor(n){
  arr = [];
  for(let candi = n; candi >0 ; candi--){
    if(n%candi == 0) arr.push(candi);
  }
  return arr;
}

function multipleGcd(arr){
  var answer;
  var fail;
  // sort 오름차순으로 
  let sorted_arr = arr.sort(function(a, b){return b - a});
  let divisors = divisor(sorted_arr[0]);

  for(var candi = divisors[0]; candi > 0; candi--){
      fail = 0;
      for(var n = 0; n<sorted_arr.length; n++){
          if(sorted_arr[n] % candi != 0) {
              fail = 1;
              break;
          }
      }
      if(fail == 0) {
          answer = candi;
          break;
      }
  }
  return answer;
}

console.log(gcd([18, 45]));
try {
  console.log(gcd([18,'we']));
} catch (e) {
  console.log(e.message);
}
console.log(multipleGcd([120, 60, 40, 20, 160]));