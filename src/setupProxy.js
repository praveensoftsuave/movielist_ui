const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = {
  target: process.env.REACT_APP_BASE_URL,
  changeOrigin: true,
  secure: false,
};

module.exports = function (app) {
  app.use("/login", createProxyMiddleware(proxy));

  app.use("/movies", createProxyMiddleware(proxy));
};