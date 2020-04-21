const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    },
    resolveLoader: {
      modules: [
        path.join(__dirname, '.', 'rules')
      ]
    },
    output: {
      libraryExport: 'default'
    },
    module: {
      // rules: [
      //   {
      //     test: /\.md$/,
      //     use: [
      //       {
      //         loader: 'vue-loader',
      //         options: {
      //           compilerOptions: {
      //             preserveWhiteSpace: false
      //           }
      //         }
      //       },
      //       {
      //         loader: require.resolve('./markdown/markdown-loader')
      //       }
      //     ]
      //   }
      // ]
    }
  },
  chainWebpack: config => {

    // config.module
    //   .rule('js')
    //   .include
    //   .add(resolve("packages"))
    //   .end()
      
    // config.module
    //   .rule('scss')
    //   .include
    //   .add(resolve("packages/theme-chalk"))
    //   .test(/\.scss$/)
    //   .oneOf('normal')
    //   .use('sass')
    //   .loader('sass-loader')
    //   .end()
    //   .end()
    // config.module.rule('md')
    // .test(/\.md$/)
    // .use('markdown-loader')
    // .loader(require.resolve('./markdown/markdown-loader'))

    config.module.rule('md')
    .test(/\.md$/)
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      compilerOptions: {
        preserveWhitespace: false
      }
    }).end()

    config.module.rule('md')
    .test(/\.md$/)
    .use('md-loader')
    .loader('md-loader')
    .end()

  },
  
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {
    }
  }
}
