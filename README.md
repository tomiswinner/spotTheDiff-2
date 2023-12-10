こちらを使った↓
https://qiita.com/non_cal/items/622108030aa2e516260c#scenemanagerphaserscenescenemanager


開発サーバー
npx webpack-dev-server


ビルド
npx webpack --mode=production


# npm と npx

npm はnode package manager、つまりパッケージの管理ツールです。
npx はnode package executer、つまりパッケージの実行を行うツールです。
ここからわかるように、そもそもこの 2 つは区分けが違います。
npm はパッケージ管理ツールなので、パッケージとしてインストールされたものを管理する目的で使い、npx は特定パッケージをインストールせずにしようするものです。
[参照](https://zenn.dev/844/articles/d06bfdbd2677a3)


> npx eslintを実行すると、./node_modules/.bin/eslintが実行されます。

[参照](https://typescriptbook.jp/tutorials/eslint)



# eslint について

- `.eslintrc.js`ファイルを参照すると手っ取り早い

[こちらが参考になる](https://typescriptbook.jp/tutorials/eslint#root)

- `rule` が最小の構成単位
  - [これが公式のrule集](https://eslint.org/docs/latest/rules/)で、こいつらを組み合わせて独自のルールを設定できる
- `sharable config` : 誰かが設定したルールのプリセット、自分で一つ一つ設定するのは大変なので、これを使うことが多い
  - [人気度合いで決めると最初は楽かも](https://typescriptbook.jp/tutorials/eslint#shareable-config%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

- `npx eslint src --fix` : 自動修正できるものを自動修正する

## eslint を一部分 disable する

```js
// eslint-disable-next-line camelcase
export const hello_world = "Hello World";
```

## TS で ESLint を使用する

> TypeScript ESLintは2つのパッケージから成ります。@typescript-eslint/parserは、ESLintにTypeScriptの構文を理解させるためのパッケージです。@typescript-eslint/eslint-pluginは、TypeScript向けのルールを追加するパッケージです。
- [参照](https://typescriptbook.jp/tutorials/eslint#typescript-eslint%E3%82%92%E5%B0%8E%E5%85%A5%E3%81%99%E3%82%8B)

- 2つのファイルが必要
  - `tsconfig.eslint.json` : ts の型情報を利用するために、tsコンパイラを使用する
    - `npx tsc --showConfig --project tsconfig.eslint.json` で設定内容が問題ないかチェックできる
  - `.eslintrc.js` : ここに eslint の設定を入れる、js でも同じ







