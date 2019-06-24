// const path = require('path');
module.exports = {
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html'
  //   }
  // },
  outputDir: 'lib',
  lintOnSave: false,
  filenameHashing: false, // 生成hash文件,默认true
  productionSourceMap: false, // 打包后是否生成.map文件（该文件用于确认单页面中报错时，定位到错误的代码的位置）
  runtimeCompiler: false,
  // 本项目中的packages为打包发布npm文件夹，所有知识webpack配置
  // configureWebpack: config => {
  //   Object.assign(config, {
  //     resolve: {
  //       extensions: ['.js', '.vue', '.json', '.css', '.scss', '.sass'], //处理引用文件后缀问题
  //       alias: {
  //         '@': path.resolve(__dirname, './src'), // 修改’@‘指向
  //         vue$: 'vue/dist/vue.esm.js'
  //       }
  //     }
  //   });
  // },
  css: {
    modules: true,
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `
          @import "@/style/common.scss";
          @import "@/style/mixin.scss";
          @import "@/style/reset.scss";
        `
      },
      css: {
        localIndentName: '[name]-[hash]',
        camelCase: 'only'
      },
      stylus: {}
    }
  },
  parallel: require('os').cpus().length > 1, // 编译时开启多进程处理babel编译
  pluginOptions: {}, // 第三放插件配置
  pwa: {}, // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  devServer: {
    // open: process.platform === 'darwin',
    open: false, // 开启后是否直接打开页面
    // host: IP,
    host: '0.0.0.0', //Local:   http://localhost:8099/ ,Network: http://192.168.100.3:8099/(本机IP)
    port: 9999,
    https: false,
    hotOnly: false,
    proxy: null,
    before: app => {},
    overlay: {
      warings: true,
      errors: true
    }
  },
  pluginOptions: {}
};
