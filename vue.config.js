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
  pluginOptions: {}
};
