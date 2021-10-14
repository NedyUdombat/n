const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Index.tsx',
  target: "web",
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /.test.(js|jsx)$/],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /.test.(ts|tsx)$/],
        use: ['ts-loader', 'eslint-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader', options: {  } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { minimize: true, sourceMap: true } },
          { loader: 'sass-loader', options: { minimize: true, sourceMap: true } },
        ],
      },
      {
        test: /\.(ttf|woff2|eot|woff|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                esModule: false,
            },
        },
      },
      {
        resolve: {
          extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
      silent: false,
      defaults: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
  },
};