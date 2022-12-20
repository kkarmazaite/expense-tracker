
module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      "plugin:vue/recommended",
      "eslint:recommended",
      "prettier/vue",
      "plugin:prettier/recommended"
    ],
    rules: {
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
    },
    plugins: ['@typescript-eslint'],
    globals: {
      $nuxt: true
    },
    parserOptions: {
      parser: "babel-eslint"
    }
  };