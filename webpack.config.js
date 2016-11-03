const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const path = require('path');

function createEntries() {
  if (process.env.NODE_ENV === 'production') {
    return ['./src/index.jsx'];
  }
  return [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index.jsx',
  ];
}

module.exports = {
  entry: createEntries(),
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },
    {
      test: /\.less$/,
      loader: 'style!css!less',
    },
    {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginCleanCSS({ advanced: true }),
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: '/[resource-path]',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Tune 1.0',
      template: path.join(__dirname, '/index.ejs'),
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
