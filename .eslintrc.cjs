module.exports = {
  extends: ['standard'],
  rules: {
    'no-tabs': 'off',
    indent: 'off',
    'space-before-function-paren': 'off'
  },
  env: {
    browser: true,
    es2021: true
  },
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}
