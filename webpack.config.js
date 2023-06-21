const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts']
  },
  entry: {
    main: path.join(__dirname, 'src/ts/ecoindex-badge.ts'),
  },
  output: {
    path: path.join(__dirname, 'assets/js'),
    filename: 'ecoindex-badge.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(svg)$/i,
        type: "asset",
      },
      {
        test: /\.ts/,
        exclude: /(node_modules)/,
        use: ['ts-loader'],
      },
      // {
      //   test: /\.ts/,
      //   use: {
      //     loader: 'prettier-loader',
      //   }
      // }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/svg/dark/*',
          to: '../svg/dark/[name][ext]',
        },
        {
          from: './src/svg/light/*',
          to: '../svg/light/[name][ext]',
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: "[path].br[query]",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    new ESLintPlugin({
      extensions: ['ts']
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-svgo",
            ],
          },
        },
        // Disable `loader`
        loader: false,
      }),
      new TerserPlugin({
        test: /\.js$/i,
        terserOptions: {
          mangle: true
        }
      })
    ]
  },
  mode: "production",
};
