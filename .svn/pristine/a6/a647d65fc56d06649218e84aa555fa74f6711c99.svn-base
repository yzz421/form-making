const path = require('path');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  });
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader', // creates style nodes from JS strings
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          modules: true,
        },
      },
      {
        loader: 'less-loader', // compiles Less to CSS
        options: { javascriptEnabled: true },
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
