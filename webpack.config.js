const path = require('path');

module.exports = {
  entry: './main.js',
  output: path.resolve(__dirname, 'dist'),
  module: {
    rules: {
      test: /\.js$/,
      exclude: /node_moudules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }
  },
  devtool: 'eval-source-map',
  mode: 'development',
  watch: true
};
