const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dsf.uhm.mybluehost.me",
      changeOrigin: true,
      secure: false,
    })
  );
};
