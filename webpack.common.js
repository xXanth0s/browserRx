const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    main: './src/browserRx.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }

    ],

  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ]
};
