module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'mocha': true
  },
  'parser': 'babel-eslint',
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    // отступы в 2 пробела
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // неболее 1го пробела подряд
    'no-multi-spaces': "error",
    // без пробелов в конце строк (кроме комментариев)
    'no-trailing-spaces': ["error", { "ignoreComments": true }],
    // переносы строк в стиде unix
    'linebreak-style': ['error', 'unix'],
    // кавычки должны быть одинарные
    'quotes': ['error', 'single'],
    // обаязательные точки с запятой
    'semi': ['error', 'always'],
    // можно миксовать оступы из пробелов и тубаляции
    'no-mixed-spaces-and-tabs': ['off', 'smart-tabs'],
    // отключение проверки на использованность
    'no-unused-vars': ['off', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
    // не использовать вывод через .log
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // не использовать более одной пустой строки подряд
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 1 }],
    // максимальная длинна строки кода - 120 символов
    'max-len': ['error', 120]
  }
};
