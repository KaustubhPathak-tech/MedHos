// src/setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:7000', // Your Node.js server address
      changeOrigin: true,
    })
  );
}
