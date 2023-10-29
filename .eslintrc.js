module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
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
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
