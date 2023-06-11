const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/api/google',
        createProxyMiddleware({
            target: 'http://192.168.1.23:8090/api/google',
            changeOrigin: true,
        })
    );
};