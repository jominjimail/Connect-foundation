const tokenizer = require('./re13.js').tokenizer;
const lexer = require('./re13.js').lexer;
const parser = require('./re13.js').array_parser;

test('tokenizer input string : one number', () => {
  let input = "[3]"
  let result = ["[", "3", "]"];
  expect(tokenizer(input)).toStrictEqual(result);
});


test('tokenizer input string : multi numbers', () => {
  let input = "[3,2,3]"
  let result = ["[", "3","2","3", "]"];
  expect(tokenizer(input)).toStrictEqual(result);
});



test('tokenizer input string : string', () => {
  let input = "['hello']"
  let result = ["[", "hello", "]"];
  expect(tokenizer(input)).toStrictEqual(result);
});


test('tokenizer input string : multi index number', () => {
  let input = "[32,32345]"
  let result = ["[", "32","32345", "]"];
  expect(tokenizer(input)).toStrictEqual(result);
});

// test('tokenizer input string : multi index ', () => {
//   let input = "[3 2,32345]"
//   let result = ["[", "32","32345", "]"];
//   expect(tokenizer(input)).toStrictEqual(result);
// });

test('lexer input arr : one number', () => {
    let input = ["[", "3", "]"];
    let result = [ { type: 'LBracket', value: '[' },
    { type: 'number', value: 3 },
    { type: 'RBracket', value: ']' } ];
    expect(lexer(input)).toStrictEqual(result);
});

test('lexer input arr : string number', () => {
    let input = ["[", "hello", "]"];
    let result = [ { type: 'LBracket', value: '[' },
    { type: 'string', value: "hello" },
    { type: 'RBracket', value: ']' } ];
    expect(lexer(input)).toStrictEqual(result);
});

test('lexer input arr : multi index number', () => {
    let input = ["[", "32","32345", "]"];
    let result = [ { type: 'LBracket', value: '[' },
    { type: 'number', value: 32 },
    { type: 'number', value: 32345 },
    { type: 'RBracket', value: ']' } ];
    expect(lexer(input)).toStrictEqual(result);
});


test('parser input arr : one number', () => {
    let input = [ { type: 'LBracket', value: '[' },
    { type: 'number', value: 3 },
    { type: 'RBracket', value: ']' } ];
    let result = {"child": [{"child": [], "type": "number", "value": 3}], "type": "array"};
    expect(parser(input)).toStrictEqual(result);
});
