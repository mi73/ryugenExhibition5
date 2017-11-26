var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

var JS_SRC = __dirname + '/resources/js';
var JS_DEST = __dirname + '/build/js';

console.log('JS_SRC', JS_SRC);

module.exports = {
  entry: {
    vendor: [
      'jquery',
      'babel-polyfill',
      'velocity-animate',
      'util',
      'events',
    ],
    index: [JS_SRC + '/index.js'],
  },
  output: {
    path: JS_DEST,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015'
    }],
  },
  devtool: 'source-map',
  plugins: [
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
  ],
  cache: true,
  watch: true
};
