const path = require('path');

module.exports = {
  mode: 'development',
  // エントリポイントとなるファイル
  entry: {
    employee: './src/apps/employee/main.js',
    shift: './src/apps/shift/main.js',
    attendance: './src/apps/attendance/main.js',
  },
  // 出力先ファイル
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
  },
  // エイリアス
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
}