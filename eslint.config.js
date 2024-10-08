module.exports = (async () => {
  const typescriptEslintPlugin = await import(
    '@typescript-eslint/eslint-plugin'
  )
  const functionalPlugin = await import('eslint-plugin-functional')

  const typescriptEslintRecommended = await import(
    '@typescript-eslint/eslint-plugin'
  )
  const functionalRecommended = await import(
    'eslint-plugin-functional/configs/recommended'
  )
  const prettierConfig = await import('eslint-config-prettier')

  return [
    'eslint:recommended',
    typescriptEslintRecommended.configs.recommended,
    functionalRecommended.default,
    prettierConfig.default,
    {
      languageOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2023,
        sourceType: 'module',
      },
      env: {
        node: true,
        es2023: true,
      },
      plugins: {
        '@typescript-eslint': typescriptEslintPlugin.default,
        functional: functionalPlugin.default,
      },
      rules: {
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
    },
  ]
})()
