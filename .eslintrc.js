module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'import', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // JS TS Checks
    complexity: ['error', 19],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'never'
      }
    ],
    'max-depth': ['error', 6],
    'max-lines': ['error', { max: 1000 }],
    'max-params': ['error', 5],
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }]
  }
};
