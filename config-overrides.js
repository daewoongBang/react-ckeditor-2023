const {
  override,
  addBabelPlugins,
  addWebpackModuleRule
} = require('customize-cra');

const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-transform-react-jsx-self'
  ),
  addWebpackModuleRule({
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: ['raw-loader']
  }),
  addWebpackModuleRule({
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          injectType: 'singletonStyleTag'
        }
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
            },
            minify: true
          })
        }
      }
    ]
  }),
  addWebpackModuleRule({
    test: /\.css$/,
    exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
    // (...)
  }),
  addWebpackModuleRule({
    test: /\.module\.css$/,
    exclude: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
    // (...)
  }),
  addWebpackModuleRule({
    loader: require.resolve('file-loader'),
    exclude: [
      /\.(js|mjs|jsx|ts|tsx)$/,
      /\.html$/,
      /\.json$/,
      /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
    ],
    options: {
      name: 'static/media/[name].[hash:8].[ext]'
    }
  })
);
