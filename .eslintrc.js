module.exports = {
  // root: true,
  env: {
    browser: true,
    es2021: true
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    "prettier/prettier": "error"
  }
}
