const createProxyMiddleware = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware(["/account", "/socket.io"], {
      target: "http://localhost:8080",
      changeOrigin: true,
      ws: true,
      router: {
        "/socket.io": "ws://nginx:80",
      },
    })
  );
};
