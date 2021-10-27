module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-debugger': 'off',
    '@typescript-eslint/no-this-alias': ['off'],
    '@typescript-eslint/no-invalid-this': ['off'],
    '@typescript-eslint/no-require-imports': ['off'],
  },
  ignorePatterns: ['stories/*', 'src/stories/*'],
};
