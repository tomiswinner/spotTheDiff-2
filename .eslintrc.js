module.exports = {
  root: true,
  // typescript のパーサーを指定
  // npm i -D @typescript-eslint/parser
  parser: '@typescript-eslint/parser',
  // typescript 用の linter の第三者のルールを追加(プラグイン = 第三者が作ったルールセット)
  // npm i -D @typescript-eslint/eslint-plugin
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // ESLint 時に使うコンパイラの設定ファイルを tsconfigRootDir からの相対パスで設定
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  // コンパイル後のプログラムを ignore
  ignorePatterns: ['dist'],
  // npm i -D eslint-config-airbnb-base
  // npm i -D eslint-plugin-import
  // npm i -D eslint-config-airbnb-typescript
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  // default export は、named export に比べて、import する側での名前を強制できるため、default を使う
  rules: {
    'import/prefer-default-export': 'off',
  },
};
