const str = "[1, [2,[3,[4,[5]]]],'hello, world', null]";
const result = ArrayParser(str);
//console.log(JSON.stringify(result,null,4));

function number_filter(str){
    var res;
    res = str.replace(/[^0-9]/g,"");
    return res;
}
function Check_arr(arr){
    let stack = [];
    let array_info = [];
    let index = 0;

    for(let i = 0;i<arr.length;i++){
        if(arr[i].type === 'LBracket'){
            stack.push(index);
            index++;
            array_info.push({start : i, end : 0});
        }else if(arr[i].type === 'RBracket'){
            if(stack.length === 0) return {result : false, array_info : array_info};
            else{
                let out_index = stack.pop();
                array_info[out_index].end = i;
            }
        }
    }
    return {result : stack.length === 0 , array_info : array_info};
}

function tokenizer(input){
    let tokenizer_arr = [];

    for(let e = 0; e<input.length;e++){
        if(input[e] !== " " && input[e] !== ","){
            if(input[e] === "[" || input[e] === "]") tokenizer_arr.push(input[e]);
            else if(input[e] === "\'"){
                let word = '';
                let flag = false;
                for(let i =e+1;i<input.length;i++){
                    if(input[i] !== '\'') word += input[i];
                    else if(input[i] === '\'') {
                        flag = true;
                        break;
                    }
                }
                if(flag == false){
                    // 토크나이져 실패!! 문자열이 올바르지 않음! 에러!!
                    throw new Error('ERROR : 올바른 문자열형태가 아니네요');
                }else{
                    tokenizer_arr.push(word);
                    e = e + word.length+1;
                    flag =false;
                }
            }else if(input[e] === 'n'){
                if(e+3 <= input.length && input[e+1] === 'u' && input[e+2] === 'l' && input[e+3] === 'l'){
                    tokenizer_arr.push('null');
                    e = e + 3;
                }
            }else{
                let num_str = input[e];

                for(let i = e+1;i<=input.length;i++){
                    if(number_filter(input[i]).length !== 0){
                        num_str += input[i];
                    }else{
                        break;
                    }
                }
                e = e + num_str.length - 1;
                tokenizer_arr.push(num_str);
            }
        }
    }
    return tokenizer_arr;
}

function lexer(arr){
    let lex_arr = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i] === '['){
            lex_arr.push({type : 'LBracket', value:'['});
        }else if(arr[i] === ']'){
            lex_arr.push({type : 'RBracket', value : ']'});
        }else if(arr[i] === 'null'){
            lex_arr.push({type : 'NULL', value : 'null'});
        }else{
            let num = number_filter(arr[i]);
            if(num.length !== 0){
                lex_arr.push({type : 'number', value:+arr[i]});
            }else{
                lex_arr.push({type : 'string', value:arr[i]});
            }
        }
    }
    return lex_arr;
}

function ArrayParser(input){
    try{
        let token_arr = tokenizer(input);
        let lexer_arr = lexer(token_arr);
        let parser_arr = array_parser(lexer_arr);
        return parser_arr;
    }catch(e){
        console.log(e);
    }
}

function array_parser(origin_arr){
    let ans = {};
    let {result, array_info} = Check_arr(origin_arr);

    if(result === true){
        ans.type = 'array';
        ans.child = [];
        let arr = array_info.shift();
        let child_arr = origin_arr.slice(arr.start+1,arr.end);
        if(child_arr.length !== 0){
            child_parser(origin_arr, child_arr, ans.child, array_info);
        }
        return ans;
    }else{
        throw new Error('ERROR : 배열이 제대로 안 닫혔어요.');
    }
}

function child_parser(origin_arr, child_arr, child, array_info){
    //console.log('in child_parser : ', child_arr);
    //배열일수도 있음.
    for(let i = 0;i<child_arr.length;i++){
        if(child_arr[i].type === 'LBracket'){
            let arr = array_info.shift();
            let array_arr = origin_arr.slice(arr.start,arr.end+1);
            let obj = array_parser(array_arr);
            child.push(obj);
            i = i + array_arr.length -1;
        }
        else{
            child.push({type: child_arr[i].type, value : child_arr[i].value, child: [] });
        }
    }
}


module.exports.tokenizer = tokenizer;
module.exports.lexer = lexer;
module.exports.array_parser = array_parser;

