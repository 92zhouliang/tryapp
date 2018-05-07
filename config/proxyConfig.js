module.exports = {
  proxyList: {
    //跨域代理 生产环境过滤
    "/api": {
      // 测试环境
      target: "http://116.62.142.54/api", // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        "^/api": "" //需要rewrite重写的,
      }
    },"/iplookup": {
      // 测试环境
      target: "http://int.dpool.sina.com.cn/iplookup", // 接口域名
      changeOrigin: true, 
      pathRewrite: {
        "^/iplookup": ""
      }
    }
  }
};
