const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const titleCase = require('title-case');
const webpack = require('webpack');

module.exports = {
  cache: true,

  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, 'src/index.tsx'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name]-[id].js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // new webpack.DefinePlugin({
    //   CITIES: (() => {
    //     const dataPath = path.resolve(__dirname, 'src/data');
    //     return JSON.stringify(
    //       fs.readdirSync(dataPath)
    //         .filter(file => (
    //           fs.statSync(path.join(dataPath, file))
    //             .isDirectory()
    //         ))
    //         .map(city => ({
    //           key: city,
    //           label: titleCase(city),
    //         })),
    //     );
    //   })(),
    // }),
  ],

  devServer: {
    overlay: true,
    port: 8000,
  },

  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { emitErrors: true },
      },
      {
        test: /\.(?:ts|tsx)$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(?:css|scss)$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.csv$/,
        loader: 'raw-loader',
      },
      {
        test: /\.yaml$/,
        use: [
          'json-loader',
          'yaml-loader',
        ],
      },
    ],
  },
};
