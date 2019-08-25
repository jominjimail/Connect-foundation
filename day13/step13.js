
// [ 1, [ 2, [ 3 ] ], 'hello world', null ]

const str = "[1, [2,[3]],'hello world', null]";
const result = ArrayParser(str);
//console.log(result); //최종결과인 result를 보기좋게 출력하기 위해 JSON.stringfiy(result)를 사용할 수 있음

// { type: 'array',
//   child: 
//    [ 
//      { type: 'number', value: '1', child: [] },
//      { type: 'array', child: [
// 		    { type: 'number', value: '2', child: [] },
//         	{ type: 'array', child: [
// 		    	{ type: 'number', value: '3', child: [] },          
//      		]},
//      ]},
//      { type: 'string', value: 'hello world', child: [] },
//      { type: 'NULL', value: 'null', child: [] } 
//    ] 
// }

function type_check(item){
    if(item[0] === '[') return 'array';
    else if(item[0] === '\'') return 'string';
    else if(item[0] === 'n') return 'NULL';
    else return 'number';
}

function ArrayParser(input){

    let token_str = tokenizer(input);
    //console.log(token_str);
    let lexer_str = array_lexer(token_str,token_str);

    console.log(JSON.stringify(lexer_str,null,4));

}

function array_lexer(origin_str,str){
    console.log('in array_lexer :', str);
    let ans = {};
    let {result, array_info} = array_check(str)
    //console.log(result, array_info);
  
    if(result === true){
        ans.type = 'array';
        ans.child = [];
        let arr = array_info.shift();
        let child_str = origin_str.slice(arr.start+1,arr.end);
        if(child_str.length !== 0){
            child_lexer(origin_str,child_str, ans.child, array_info);
        }
        return ans;
    }
    

}

function child_lexer(origin_str,child_str, child, array_info){
    // 배열일수도 있음.
    child_str += ',';
    console.log('in child_lexer :',child_str);

    let item ='';
    for(let e=0;e<child_str.length;e++){

        if(child_str[e] === '['){
            let arr = array_info.shift();
     
            let array_str = origin_str.slice(arr.start,arr.end+1);
            //console.log(array_str.length);
            e = e + array_str.length -1;
            //array_lexer(origin_str,array_str,)
            item = array_str;

        }
        else if(child_str[e] === ','){
            let item_type = type_check(item);
        
            if(item_type === 'array'){
                //array_lexer(origin_str,str, ans)
                let obj = array_lexer(item, item);
                child.push(obj);
                console.log('not yet');
            }else{
                child.push({type: item_type, value : item, child: [] });
            }

            item = '';
        }else{
            item += child_str[e];
        }
    }
        
}

function array_check(str){
    let stack = [];
    let array_info = [];
    let index = 0;

    for(let e = 0;e<str.length;e++){
        if(str[e] === '['){
            stack.push(index);
            index++;
            array_info.push({start : e, end : 0});
        }else if(str[e] === ']'){
            if(stack.length === 0) return {result : false, array_info : array_info};
            else {
                let out_index = stack.pop();
                array_info[out_index].end = e;
            }
        }
    }
    return {result : stack.length === 0 , array_info : array_info};
}

function tokenizer(input){
    let token_str = '';
    for(let e = 0; e<input.length;e++){
        if(input[e] != " "){
            token_str += input[e];
        }
    }
    return token_str;
}