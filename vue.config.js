module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "views": "@/views",
      }
    }
  }
};
