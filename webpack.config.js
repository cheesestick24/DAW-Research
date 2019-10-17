const path = require('path');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効で JS ファイルが出力される
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: "main.js"
  },
  mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dist",
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};