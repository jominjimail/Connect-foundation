const ERRORS = {
  string: 'Error: 올바른 문자열 형태가 아닙니다',
  array: 'Error: 올바른 배열 형태가 아닙니다.'
};

const TYPES = {
  array: 'array',
  number: 'number',
  string: 'string',
  NULL: 'NULL',
  bracket: 'bracket'
};

const NULL = 'null';

const REGEX = {
  whitespace: /\s/,
  comma: /[,]/,
  numbers: /[0-9]/
};

module.exports = {
  ERRORS,
  TYPES,
  REGEX,
  NULL
};
