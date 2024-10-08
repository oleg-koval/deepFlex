module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'functional'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:functional/recommended',
    'prettier',
  ],
  rules: {
    // Customize rules based on functional programming principles
    'functional/immutable-data': 'error',
    'functional/no-let': 'error',
    'functional/no-try-statement': 'error',
    'functional/no-method-signature': 'error',
    'functional/no-loop-statement': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
  },
}
