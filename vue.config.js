module.exports = {
  outputDir: 'lib',
  lintOnSave: false,
  filenameHashing: false, // 生成hash文件,默认true
  runtimeCompiler: false,
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
    open: false, // 开启后是否直接打开页面
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
