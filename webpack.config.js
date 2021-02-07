const path = require('path')
module.exports = {
  entry: './src/LinearUnit.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'linear-unit.js',
    library: 'LinearUnit',
    libraryTarget: 'umd',
  },
}
