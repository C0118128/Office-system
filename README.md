## kintoneカスタマイズ
JS/CSSアップロード：`https://developer.cybozu.io/hc/ja/articles/360015889812`
JSイベント：`https://developer.cybozu.io/hc/ja/articles/201941954`


## インストール
```
$ npm install -g @kintone/customize-uploader
```

## アプリ追加後にやること
1. src/apps/配下にアプリ名のディレクトリ作成
2. その中にmain.jsとmanifest.jsonを作成
3. webpack.config.jsのentryに追記
4. 必要ならupload.shにコマンド追記

## ファイル構造
```
src
├── apps
│   └── [アプリ名]
│       ├── main.js(webpackエントリポイントファイル)
│       └── manifest.json(kintone用マニフェストファイル)
└── modules
    └── recordManager.js
```

## manifest.json
- コマンド実行場所をカレントディレクトリとする
```json:
{
    "app": [アプリID],
    "scope": "ALL",
    "desktop": {
        "js": [JSファイルのパス],
        "css": [CSSファイルのパス]
    },
    "mobile": {
        "js": [JSファイルのパス],
        "css": [CSSファイルのパス]
    }
}
```

## コマンドでアップロード
```
$ kintone-customize-uploader \
    --domain [サブドメイン].cybozu.com \
    --username [ユーザー名] \
    --password [パスワード] \
    [manifest.jsonのパス]
```

## スクリプトでアップロード
```bash:
#!/bin/sh
DOMAIN='ドメイン名'
USERNAME='ユーザー名'
PASSWORD='パスワード'
MANIFEST_FILE_PATH='./src/apps/[アプリ名]/manifest.json'

kintone-customize-uploader \
    --domain ${DOMAIN}.cybozu.com \
    --username $USERNAME \
    --password $PASSWORD \
    $MANIFEST_FILE_PATH
```

## Tips
## webpack.config.js
```js:
const path = require('path');

module.exports = {
  mode: 'development',
  // エントリポイントとなるファイル
  entry: {
    [app_name]: './src/apps/[app_name]/main.js',
  },
  // 出力先ファイル
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].js' // -> app_name.js
  },
}
```
