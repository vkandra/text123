const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://master.dsmflmvaq3lvd.amplifyapp.com',
      changeOrigin: true,
    })
  );
};
