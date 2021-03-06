module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['*.spec.*'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended'],
    },
  ],
};
